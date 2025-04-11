---
title: "You might not need Websockets"
description: "Websockets are powerful tools that have become a fan-favorite for building realtime applications, but you might be using them for all the wrong reasons. Let's explore the pitfalls of websockets and how we can use plain old HTTP to get the same job done."
image: "/assets/blog/websocket-hero.png"
publishDate: "2025-04-12"
---

## What's a WebSocket?

If you're new to web development or you haven't heard of a WebSocket before, they're a way to open a two-way communication channel between the client and server using HTTP as the transport protocol. In less nerdy terms, it's a way to keep an open line of communication between the client and server so that both can send and receive messages at any time. ([MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API))

Because of how it's advertised on the tin, it's natural to think of a WebSocket as the best (and sometimes only) way to orchestrate a long-living stream of data between client and server, like for instance a real time application. In practice though, it turns out there are a few reasons why you might not want to use them:

### WebSocket messages aren't transactional

I see a lot of instances where WebSockets are used as the way of maintaining consistency for some kind of state object. For instance, you use the transmitting side of the socket to represent mutations to some object, and the receiving side of the socket to represent state as it gets changed by those mutations. That way if you have multiple clients listening to the same object, they'll all see the same state changes without having to refresh the page.

```
# Client 1
>>> { command: "increment", amount: 5 }
<<< { event: "count", value: 5 }
>>> { command: "decrement", amount: 2 }
<<< { event: "count", value: 3 }
# Client 2
<<< { event: "count", value: 5 }
<<< { event: "count", value: 3 }
```

But what if you placed some kind of invariant condition on the state object? For instance, you want to make sure that the count is never negative:

```
<<< { event: "count", amount: 5 }
>>> { command: "decrement", amount: 6 }
<<< { error: "count cannot be negative" }
```

The issue here is that there's no association between the mutation and error message since the error message will be received on the same stream as every other message. We can't reliably say "the next message" received on the stream is the result of the previous command since the server could have sent any number of messages in between now and then.

If we wanted to update the UI to show the error, we'd have to link the error event somehow (like providing an associative request id in the command and the error message):

```
>>> { command: "decrement", amount: 6, requestId: "123" }
<<< { error: "count cannot be negative", requestId: "123" }
```

This becomes even more awkward because now you have to keep track of every message you send, and you have to find some way to bubble the error event back to the UI in an idempotent way. The same goes if you wanted to have some kind of indication that the command was received by the server. In that case, now you're also dealing with certain hard-to-track edge cases:

* What if the socket closes before the server can process the command?
* What if you never receive a response message on the socket for some reason?
* What if you're dealing with a huge number of concurrent requests?

It creates too many unknowns and complexity for something that should be simple. If you're dealing with messages where you need to know if they were received or not, you're better off with using a more transactional protocol like HTTP to represent the sending side of the socket.

```
( < > ) = HTTP
( <<< >>> ) = WebSocket

# Success
> POST /increment '{ value: 5 }'
< 200 OK
<<< { event: "count", value: 5 }
#- (the update message still gets sent to all connected clients)

# Failure
> POST /decrement '{ value: 6 }'
< 400 Bad Request
#- (no update gets sent because the request failed)
```

We've effectively ditched the transmitting side of the socket altogether and replaced it with HTTP, which means we're now leaning on WebSockets to represent only one stream of data (the receiving side). As it turns out there's other ways to do that don't require the overhead of a full duplex connection. _(we'll get into this later)_

_If you're sending messages that don't necessarily need to be acknowledged (like a heartbeat or keyboard inputs), then Websockets make a great fit. Hence the title of this post, you **might** not need Websockets._

### You have to manage the socket lifecycle

When you use WebSockets, you’re not just sending and receiving messages at will—your application also has to respond to the opening and closing of the connection. This means handling events like “open” and “close” (or “error”), deciding what to do during reconnect attempts, and cleaning up resources when the connection is no longer needed.

For example, a basic lifecycle for a WebSocket in the browser might look like this:

```js
const socket = new WebSocket("wss://example.com/socket");

socket.addEventListener("open", () => {
  console.log("Socket opened");
});

socket.addEventListener("message", (event) => {
  console.log("Received message:", event.data);
});

socket.addEventListener("error", (err) => {
  console.error("Socket error:", err);
});

socket.addEventListener("close", () => {
  console.log("Socket closed. Attempting to reconnect…");
  // Potentially restart or schedule a new socket connection here
});
```

In a typical application, you might need to restart a closed connection, buffer messages while the socket is down, and handle retries with exponential backoff. Ignoring any of these steps can lead to lost messages, clumsy user experiences, or lingering connections. By contrast, with a simpler request/response model like HTTP, the lifecycle is more straightforward: each request starts, completes (or fails), and then you move on.

The extra complexity of a WebSocket’s lifecycle is one of the main reasons you might not need it—unless there's absolutely no alternative to socket based messaging (partially demonstrated in the previous section), then you're better off with a simpler communication pattern.

### It makes your server code more complex

When a new WebSocket connection is initiated, your server has to handle the HTTP "upgrade" request handshake. Instead of completing an ordinary request, the server checks for the special headers indicating a WebSocket handshake and then upgrades the connection from HTTP to a persistent socket. That means for every initial connection, the server must parse and validate WebSocket headers like "Sec-WebSocket-Key" and respond with the correct "Sec-WebSocket-Accept" header. ([MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Sec-WebSocket-Key#websocket_opening_handshake))

The upgrade mechanism itself requires additional plumbing: you need to create a listener for the upgrade event on your server, confirm the request is valid, finalize the handshake, and then start broadcasting or receiving data. This not only adds more moving parts (compared to standard request/response flows) but also means comprehension of HTTP alone isn’t enough for debugging or troubleshooting—now you’re dealing with a specialized connection protocol.

If you're also dealing with similar request/response semantics as we've detailed above, it can introduce even more complexity since now your server code is written with the durable nature of sockets in mind, not the ephemeral nature of HTTP. Additionally, your application will need to manage all the edge cases: what if the client tries upgrading in an unsupported way? What if the handshake fails mid-stream or times out? What about partial data frames that need to be reassembled?

While libraries and frameworks do a really good job of hiding some of these details under the hood, all these potential points of failure point back to a single truth: if you don’t truly need the power of a bidirectional, always-on socket, the handshake cost and the expanded error states can overshadow any performance or real-time benefits.

---

So what's the alternative?

We touched on it very briefly in the previous sections, but if we can abstract away the transmitting side of the socket and only be left with a one-way stream of data on the receiving side, we can use a much simpler communication pattern.

## HTTP Streaming

If you look deeper into how HTTP works, you'll find that it's actually a protocol designed for streaming data. If it wasn't, we couldn't stream video without loading the entire file first, or load huge websites without downloading the whole page.

As it turns out that data stream doesn't have to be split up chunks of some large blob of data. We can use the same principle to represent any arbitrary stream of data, like the real time updates that we were leaning on WebSockets for.

Here's an example in server-side JavaScript of how this would look using our counter example from before:

```js
let counter = 0;
let resolvers = new Set();

// this returns a promise that resolves when the next
// value is available.
async function nextValue() {
  return new Promise((resolve) => resolvers.add(resolve));
}

// look up what an `async generator` is if you're lost
// looking at this syntax. explaining it is out of scope
// for this post.
async function* valueGenerator() {
  // (this loop gets broken when the response stream is closed.)
  while (true) {
    // every time we get the next value from the iterator,
    // we yield the return from an awaited promise that resolves
    // when the next value is available.
    yield await nextValue();
  }
}

async function processCommand(command) {
  // this is what handles our "state updates"
  counter = nextCounterValue(command);
  // for each iterator (i.e. client that called `/stream`)
  // that's waiting on a value, we resolve the promise with
  // the new value
  for (const resolver of resolvers) {
    resolver(counter);
    resolvers.delete(resolver);
  }
}

// this is the function that computes the next state
// based on the command, and enforces any invariants
// that we want to have on the state.
function nextCounterValue(command) {
  let next = counter;
  if (command.type === "increment") {
    next += command.amount;
  } else if (command.type === "decrement") {
    next -= command.amount;
  }
  if (next < 0) {
    throw new Error("count cannot be negative");
  }
  return next;
}

// we use hono/express like syntax here, but you can
// use any server framework you want.

app.post("/increment", async (req, res) => {
  try {
    const { value } = await req.json();
    processCommand({ type: "increment", amount: value });
    return new Response("OK", 200);
  } catch (error) {
    return new Response(error.message, 400);
  }
});

app.post("/decrement", async (req, res) => {
  try {
    const { value } = await req.json();
    processCommand({ type: "decrement", amount: value });
    return new Response("OK", 200);
  } catch (error) {
    return new Response(error.message, 400);
  }
});

app.get("/stream", (req, res) => {
  // We can create a stream from any async iterator, so
  // we can pass the generator function that yields counter
  // updates as they become available.
  const stream = ReadableStream.from(valueGenerator());
  return new Response(stream);
});
```

We can then use the Stream API on the browser side to read the data as it comes in, and update our UI according to whatever the server sends.

```js
const response = await fetch("/stream");
const reader = response.body.getReader();
const decoder = new TextDecoder();

while (true) {
  // wait for the next chunk of data
  // (will only come when a state update is made)
  const { done, value } = await reader.read();
  // when the server is done sending data, we break out of the loop
  if (done) break;
  // decode the chunk since data gets encoded over the network
  const chunk = decoder.decode(value);
  // update the UI with the new state
  updateUI(chunk);
}
```

With this setup we've completely eliminated the need for WebSockets while still maintaining real-time updates between multiple clients!

### Bonus: Making it easy with eventkit

This is a little bit of a shameless plug, but it's my post so you're just going to have to live with it.

I've been working on a library called [eventkit](https://github.com/hntrl/eventkit) that makes it easy to compose and observe asynchronous streams of data. If you're familiar with the observable pattern or RxJS, it's very similar but with better side effect management and built with generators.

To harp on the counter example a little bit more, here's how you could use eventkit to implement the same functionality:

```ts
// server.ts
import { Stream, AsyncObservable } from "eventkit";

let counter = 0;
const stateUpdates$ = new Stream();

// when a new value is pushed into the stream,
// we update the counter
stateUpdates$.subscribe((value) => {
  counter = value;
});

function nextCounterValue(command) {
  let next = counter;
  if (command.type === "increment") {
    next += command.amount;
  } else if (command.type === "decrement") {
    next -= command.amount;
  }
  if (next < 0) {
    throw new Error("count cannot be negative");
  }
  return next;
}

app.post("/increment", async (req, res) => {
  try {
    const { value } = await req.json();
    const next = nextCounterValue(
      { type: "increment", amount: value }
    );
    stateUpdates$.push(next);
    return new Response("OK", 200);
  } catch (error) {
    return new Response(error.message, 400);
  }
});

app.post("/decrement", async (req, res) => {
  try {
    const { value } = await req.json();
    const next = nextCounterValue(
      { type: "decrement", amount: value }
    );
    stateUpdates$.push(next);
    return new Response("OK", 200);
  } catch (error) {
    return new Response(error.message, 400);
  }
});

app.get("/stream", (req, res) => {
  // We can use the `Stream` class as an async iterator
  // to create a stream from it in the exact same way.
  const stream = ReadableSteam.from(stateUpdates$);
  return new Response(stream);
});
```

```ts
// client.ts
import { AsyncObservable, map } from "eventkit";

const response = await fetch("/stream");
const decoder = new TextDecoder();
const counter$ = AsyncObservable.from(response.body);

counter$
  .pipe(map((value) => decoder.decode(value)))
  .subscribe(updateUI);
```

I learned about the capabilities of the Stream API while building it and think it's a really good candidate for your next real-time/event-based application. If you say otherwise, please [open an issue](https://github.com/hntrl/eventkit/issues) and tell me why.

I wouldn't be a good project maintainer if I didn't tell you to at least go [check it out](https://github.com/hntrl/eventkit?utm_source=hntrl&utm_campaign=ydnw). We also wrote a separate [HTTP Streaming](https://hntrl.github.io/eventkit/guide/examples/http-streaming?utm_source=hntrl&utm_campaign=ydnw) guide that goes a little bit deeper into this topic in case you're interested.

---

Thanks for reading this wall of text! If you have any questions/comments, I'm around on [X/Twitter](https://x.com/huntlovell). I also post more schizo ramblings on there, so I would appreciate the follow if that's the sort of thing you're into.