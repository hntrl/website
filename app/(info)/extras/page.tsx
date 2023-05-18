import { SiSpotify } from "react-icons/si";
import { Suspense } from "react";
import Image from "next/image";

import { GenericLink, Link } from "~/components/link";
import { ChessRapid, LoadingIcon } from "~/components/icons";

import { getValorantRank } from "~/app/api/spotify/getValorantRank";
import fetchRapidStats from "~/app/api/spotify/getRapidStats";
import getCurrentTrack from "~/app/api/spotify/getCurrentTrack";

export const revalidate = 30;

async function TrackCard() {
  const track = await getCurrentTrack();
  if (track.item != null && track.is_playing) {
    return (
      <a
        rel="noopener noreferrer"
        target="_blank"
        href="https://open.spotify.com/user/26agyt9ay747kshc3h5fmj5gj?si=07c94963b3a44236"
        className="group flex items-center w-fit max-w-sm transition transform duration-[50ms] hover:scale-[1.005] border border-slate-900 hover:border-gray-400 rounded-sm overflow-hidden"
      >
        <Image
          src={track.item.album.images[0].url}
          width={32}
          height={32}
          alt={track.item.name}
        />
        <div className="grid grid-cols-[1fr_1.25rem] items-center gap-2 px-2 bg-gray-900 h-8">
          <div className="whitespace-nowrap text-ellipsis overflow-hidden">
            <span>{track.item.name}</span> —{" "}
            <span>
              {track.item.artists.map((artist) => artist.name).join(", ")}
            </span>
          </div>
          <SiSpotify className="w-full" />
        </div>
      </a>
    );
  }
  return <span>nothing</span>;
}

async function RapidText() {
  const rapid = await fetchRapidStats();
  return (
    <GenericLink
      href={`https://chess.com/member/${process.env.CHESS_USERNAME}`}
      className="flex gap-1 items-center font-semibold text-white"
    >
      <ChessRapid className="w-4 text-[#6d9b49]" />
      {rapid.stats.rating_max}
    </GenericLink>
  );
}

async function RankText() {
  const rank = await getValorantRank();
  return (
    <GenericLink
      href={`https://tracker.gg/valorant/profile/riot/${encodeURIComponent(
        process.env.VAL_USERNAME || ""
      )}/overview`}
      className="flex gap-1 items-center font-semibold text-white"
    >
      <Image
        src={rank.images.large}
        alt={rank.currenttierpatched}
        width={20}
        height={20}
      />
      {rank.currenttierpatched}
    </GenericLink>
  );
}

export default async function ExtrasPage() {
  return (
    <div className="mb-12">
      <h1 className="lowercase mb-3 text-2xl font-mono font-semibold">
        Extras
      </h1>
      <p>
        Thanks for checking out this website! All the source code is available
        at{" "}
        <GenericLink href="https://github.com/hntrl/website">
          github.com/hntrl/website
        </GenericLink>
        .
      </p>
      <li className="ml-4">
        <GenericLink href="/dog" target="_self">
          /dog
        </GenericLink>
      </li>
      <li className="ml-4">
        <GenericLink href="https://github.com/hntrl">GitHub</GenericLink>
      </li>
      <div className="h-px w-full my-4 bg-gray-100/30" />
      <div className="grid grid-rows-3 gap-2">
        <div className="flex items-center gap-1">
          currently{" "}
          <Suspense fallback={<LoadingIcon />}>
            {/* @ts-expect-error Async Server Component */}
            <RankText />
          </Suspense>
          in Valorant
        </div>
        <div className="flex items-center gap-1">
          currently rated{" "}
          <Suspense fallback={<LoadingIcon />}>
            {/* @ts-expect-error Async Server Component */}
            <RapidText />
          </Suspense>
          in Chess (play me some time!)
        </div>
        <div className="flex items-center gap-1 h-8 whitespace-nowrap">
          currently listening to
          <Suspense fallback={<LoadingIcon />}>
            {/* @ts-expect-error Async Server Component */}
            <TrackCard />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
