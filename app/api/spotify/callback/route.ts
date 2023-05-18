import queryString from "querystring";
import { kv } from "@vercel/kv";

/* adapted from Spotify: https://developer.spotify.com/documentation/web-api/howtos/web-app-profile */

export async function GET(req: Request) {
  const reqUrl = new URL(req.url);
  const code = reqUrl.searchParams.get("code") as string;

  const verifier = await kv.get("spotify:verifier");

  const params = queryString.stringify({
    client_id: process.env.SPOTIFY_CLIENT_ID,
    grant_type: "authorization_code",
    code: code,
    redirect_uri: `${reqUrl.origin}/api/spotify/callback`,
    code_verifier: verifier as string,
  });

  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });
  if (result.status != 200) {
    return new Response("spotify didn't give me a refresh token >:(", {
      status: 500,
    });
  }

  const { refresh_token } = await result.json();
  await kv.set("spotify:refresh_token", refresh_token);

  return new Response("OK", { status: 200 });
}
