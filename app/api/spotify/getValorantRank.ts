import "server-only";

let [username, tag] = (process.env.VAL_USERNAME || "").split("#");

type ValorantRank = {
  // some items are ommitted because they're irrelevant
  currenttierpatched: string;
  images: {
    large: string;
  };
};

export async function getValorantRank(): Promise<ValorantRank> {
  const result = await fetch(
    `https://api.henrikdev.xyz/valorant/v1/mmr/na/${encodeURIComponent(
      username
    )}/${tag}`
  );
  const { data } = await result.json();
  return data;
}
