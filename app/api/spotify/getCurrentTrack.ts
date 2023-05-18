import "server-only";

import queryString from "querystring";
import { kv } from "@vercel/kv";

/* adapted from Spotify: https://developer.spotify.com/documentation/web-api/howtos/web-app-profile */

type SpotifyAuthorizationResponse = {
  access_token: string;
  token_type: "Bearer";
  scope: string;
  expires_in: number;
  refresh_token: string;
};

async function getAccessToken(): Promise<SpotifyAuthorizationResponse> {
  const storedRefreshToken = await kv.get("spotify:refresh_token");
  const params = queryString.stringify({
    client_id: process.env.SPOTIFY_CLIENT_ID,
    grant_type: "refresh_token",
    refresh_token: storedRefreshToken as string,
  });

  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
    next: {
      revalidate: 3600,
    },
  });

  const { access_token, refresh_token } = await result.json();
  if (refresh_token && storedRefreshToken != refresh_token) {
    await kv.set("spotify:refresh_token", refresh_token);
  }
  return access_token;
}

type SpotifyImage = {
  url: string;
  width: number;
  height: number;
};
type SpotifyTrackResponse = {
  // some items are ommitted because they're irrelevant
  item: {
    album: {
      name: string;
      images: SpotifyImage[];
    };
    artists: {
      name: string;
    }[];
    external_urls: {
      spotify: string;
    };
    name: string;
  } | null;
  is_playing: boolean;
};

export default async function getCurrentTrack(): Promise<SpotifyTrackResponse> {
  let spotifyToken = await getAccessToken();
  const result = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: {
        Authorization: `Bearer ${spotifyToken}`,
      },
      next: {
        revalidate: 30,
      },
    }
  );
  if (result.status == 204) {
    return {
      item: null,
      is_playing: false,
    };
  }
  return await result.json();
}
