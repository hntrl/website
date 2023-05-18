"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { Navigation } from "./nav";

export default function InfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  useEffect(() => {
    if (typeof window == "undefined") {
      return;
    }
    let audio = new Audio("/nav.mp3");
    audio.volume = 0.4;
    void audio.play().catch(() => null);
  }, [pathname]);
  return (
    <main className="info min-h-screen pt-8">
      <div className="flex md:flex-row flex-col">
        <div className="lg:mx-auto">
          <Navigation />
        </div>
        <div className="max-w-3xl basis-full px-4">{children}</div>
        <div className="hidden lg:block mx-auto opacity-0 pointer-events-none">
          <Navigation />
        </div>
      </div>
    </main>
  );
}
