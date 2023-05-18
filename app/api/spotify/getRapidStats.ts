import "server-only";

type RapidStatsResponse = {
  // some items are ommitted because they're irrelevant
  stats: {
    rating_max: number;
  };
};

export default async function getRapidStats(): Promise<RapidStatsResponse> {
  const result = await fetch(
    `https://www.chess.com/callback/stats/live/rapid/${process.env.CHESS_USERNAME}/0`,
    {
      headers: {
        Accept: "application/json",
        "Accept-Language": "en-US,en;q=0.9",
        "Cache-Control": "no-cache",
      },
    }
  );
  return await result.json();
}
