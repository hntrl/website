"use client";

import { TbMail } from "react-icons/tb";
import { FaArrowLeft, FaDiscord, FaTwitter } from "react-icons/fa";
import { useEffect, useState } from "react";
import Link from "next/link";

import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";

import { GenericLink } from "~/components/link";

function getYearsSinceBirth() {
  let birthDate = moment("2004-02-23 16:37");
  return moment().diff(birthDate, "year", true).toString().substring(0, 11);
}

export function BioCopy() {
  const [years, setYears] = useState(getYearsSinceBirth().substring(0, 2));
  useEffect(() => {
    const interval = setInterval(() => {
      setYears(getYearsSinceBirth());
    }, 10);
    return () => clearInterval(interval);
  }, [years]);

  const [contactShown, setContactShown] = useState(false);

  return (
    <div className="shrink">
      <h1 className="lowercase mb-3 text-3xl font-mono font-semibold z-10">
        Hunter Lovell
      </h1>
      <div className="grid grid-cols-1">
        <AnimatePresence initial={false}>
          {contactShown ? (
            <motion.div
              key="contact"
              initial={{ opacity: 0.5, translateY: "100%" }}
              animate={{ opacity: 1, translateY: "0%", scale: 1 }}
              exit={{ opacity: 0.5, scale: 0.95 }}
              transition={{ ease: "easeOut", duration: 0.15 }}
              className="bg-black row-start-1 col-start-1"
            >
              <div
                className="flex items-center gap-1 hover:underline cursor-pointer mb-4"
                onClick={() => setContactShown(false)}
              >
                <FaArrowLeft className="w-3 h-3" /> Go back
              </div>
              <div className="flex items-center mb-4 p-4 transition transform duration-[50ms] hover:scale-[1.005] bg-white/5 border border-neutral-800 hover:border-neutral-500 rounded-md">
                <FaDiscord className="w-6 h-6 mr-3" />
                hntrl
              </div>
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="mailto:hunter@hntrl.io"
                className="flex items-center mb-4 p-4 transition transform duration-[50ms] hover:scale-[1.005] bg-white/5 border border-neutral-800 hover:border-neutral-500 rounded-md"
              >
                <TbMail className="w-6 h-6 mr-3" />
                hunter@hntrl.io
              </a>
            </motion.div>
          ) : (
            <motion.div
              key="bio"
              initial={{ opacity: 0.5, translateY: "100%" }}
              animate={{ opacity: 1, translateY: "0%", scale: 1 }}
              exit={{ opacity: 0.5, scale: 0.95 }}
              transition={{ ease: "easeOut", duration: 0.15 }}
              className="bg-black row-start-1 col-start-1"
            >
              <p className="mb-2">
                Hey! I'm Hunter 👋. I'm a{" "}
                <span className="font-mono font-semibold">{years}</span> year
                old software engineer from the states. I specialize in building
                fault-tolerant backend systems and web applications to pair with
                it. I'm passionate about building cool digital experiences and
                anything esports.
              </p>
              <p className="mb-2">
                I'm currently working on{" "}
                <span className="font-bold">hyper</span>, a backend framework
                built for interoperability and scale based on reactive
                principles.
              </p>
              <p className="mb-4">
                When i'm not at a computer, you can find me skiing somewhere in
                the rockies, spending time with my dog{" "}
                <GenericLink href="/dog" target="_self">
                  Ozzy
                </GenericLink>
                , or (probably) losing rank in Valorant.
              </p>
              <div className="font-mono uppercase transition text-zinc-400 flex gap-6">
                <div
                  className="hover:text-white cursor-pointer"
                  onClick={() => setContactShown(true)}
                >
                  Contact
                </div>
                <Link className="hover:text-white" href="/resume">
                  Resume
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
