"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { twMerge as cs } from "tailwind-merge";

export function Navigation() {
  const pathName = usePathname();
  return (
    <div className="font-mono text-sm lowercase flex flex-col w-full whitespace-nowrap pl-4 md:pl-10 mt-1 mb-6 text-zinc-400">
      <Link
        className={cs("hover:text-white", pathName == "/" && "text-white")}
        href="/"
      >
        1. About me
      </Link>
      <Link
        className={cs("hover:text-white", pathName == "/tech" && "text-white")}
        href="/tech"
      >
        2. What I Use
      </Link>
      <Link
        className={cs(
          "hover:text-white",
          pathName == "/projects" && "text-white"
        )}
        href="/projects"
      >
        3. Past Projects
      </Link>
      <Link
        className={cs(
          "hover:text-white",
          pathName == "/extras" && "text-white"
        )}
        href="/extras"
      >
        4. Extras
      </Link>
    </div>
  );
}
