import Image from "next/image";

import { BioCopy } from "./bio";
import avatar from "./avatar.png";

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-12">
      <div className="flex gap-4">
        <div className="border-2 rounded-full w-fit h-fit">
          <Image
            alt="Hunter Lovell"
            className="rounded-full border-2 border-transparent"
            src={avatar}
            width={72}
            placeholder="blur"
            priority
          />
        </div>
        <span className="hidden md:block w-px bg-white h-20"></span>
      </div>
      <div className="basis-full">
        <BioCopy />
      </div>
    </div>
  );
}
