import { NextRequest, NextResponse } from "next/server";

import queryString from "querystring";
import { kv } from "@vercel/kv";

/* adapted from Spotify: https://developer.spotify.com/documentation/web-api/howtos/web-app-profile */

function generateCodeVerifier(length: number) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier: string) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export async function GET(req: NextRequest) {
  const reqUrl = new URL(req.url);
  if (reqUrl.searchParams.get("secret") != process.env.SPOTIFY_CLIENT_SECRET) {
    return new NextResponse(
      JSON.stringify({ status: 401, message: "Unauthorized" }),
      { status: 401 }
    );
  }

  const verifier = generateCodeVerifier(128);
  await kv.set("spotify:verifier", verifier);

  const challenge = generateCodeChallenge(verifier);
  const params = queryString.stringify({
    client_id: process.env.SPOTIFY_CLIENT_ID,
    response_type: "code",
    redirect_uri: `${reqUrl.origin}/api/spotify/callback`,
    scope: "user-read-currently-playing",
    code_challenge_method: "S256",
    code_challenge: await challenge,
  });

  return Response.redirect(`https://accounts.spotify.com/authorize?${params}`);
}
