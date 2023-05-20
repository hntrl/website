import {
  SiReact,
  SiGo,
  SiDocker,
  SiVisualstudiocode,
  SiKubernetes,
  SiPython,
  SiNeo4J,
  SiPostgresql,
  SiMongodb,
  SiTailwindcss,
  SiTypescript,
  SiGit,
  SiAmazonaws,
  SiDigitalocean,
  SiVercel,
  SiRabbitmq,
  SiGraphql,
  SiRedis,
  SiGithub,
  SiAdobecreativecloud,
  SiFigma,
  SiGrafana,
  SiPrometheus,
  SiShopify,
} from "react-icons/si";
import { type IconType } from "react-icons";

import { GenericLink } from "~/components/link";
import { HyperIcon, NextIcon } from "~/components/icons";

function TechIcon({ icon, name }: { icon: IconType; name: string }) {
  return (
    <div className="relative group p-1 cursor-default">
      <span className="text-black bg-white text-xs text-center font-mono invisible group-hover:visible absolute left-1/2 -translate-x-1/2 bottom-[calc(100%+3px)] px-2 py-1 after:content-[' '] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-white z-10">
        {name}
      </span>
      {icon({ className: "w-6 h-6" })}
    </div>
  );
}

const tech = [
  {
    name: "Golang",
    application: "Backend language",
    description: (
      <p>
        Go has been the bread and butter for anything I use that deals with
        state or a server rack. It's flawed, but it's a great language.
      </p>
    ),
    icon: SiGo({ className: "text-white w-8 h-8" }),
    color: "#0da4e0",
  },
  {
    name: "hyper",
    application: "Backend framework",
    description: (
      <p>
        My own language that centers around rapid iteration for distributed
        systems. Still a WIP, but am really excited to show what it can do.
        <GenericLink
          href="https://hntrl.github.io/lang"
          className="text-sm font-mono font-semibold ml-1.5"
        >
          check it out
        </GenericLink>
      </p>
    ),
    icon: <HyperIcon className="w-4/5" />,
  },
  {
    name: "React",
    application: "Frontend framework",
    description: (
      <p>
        The defacto standard for building applications on the web and the one I
        have most experience in.
      </p>
    ),
    icon: SiReact({ className: "text-[#61dafb] w-6 h-6" }),
    color: "#232340",
  },
  {
    name: "Next.JS",
    application: "React framework",
    description: <p>If you're deploying React to the web, Next is a must.</p>,
    icon: <NextIcon className="w-4/5" />,
    color: "black",
  },
  {
    name: "Docker",
    application: "Containerization",
    description: (
      <p>
        Putting backend code in containers is something that (imho) is crucial
        to any deployment.
      </p>
    ),
    icon: SiDocker({ className: "text-white w-8 h-8" }),
    color: "#066da5",
  },
];

export default function TechPage() {
  return (
    <div className="mb-12">
      <h1 className="lowercase mb-2 text-2xl font-mono font-semibold">
        What I use
      </h1>
      <p className="mb-4">
        I'm always looking to learn the latest-and-greatest tech out there, but
        here's a list of the ones I keep coming back to.
      </p>
      <div className="flex flex-col gap-4 mb-8">
        {tech.map((item, idx) => (
          <div
            key={idx}
            className="grid grid-cols-[4rem_1fr] grid-rows-1 items-center gap-4 transition transform duration-[50ms] hover:scale-[1.005] bg-white/5 border border-neutral-800 hover:border-neutral-500 rounded-md overflow-hidden"
          >
            <div
              className="grow flex items-center justify-center text-white h-full py-2"
              style={{ backgroundColor: item.color }}
            >
              {item.icon}
            </div>
            <div className="md:grid grid-cols-[8.75rem_1fr] items-center">
              <div className="flex place-items-center pt-3 md:pt-0 h-full md:justify-between">
                <div className="flex md:block items-center md:py-3">
                  <div className="font-mono font-semibold">{item.name}</div>
                  <div className="md:hidden text-sm px-2">/</div>
                  <div className="text-sm">{item.application}</div>
                </div>
                <span className="w-px h-3/5 border hidden md:block" />
              </div>
              <div className="md:pl-4 pr-4 py-2">{item.description}</div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-center italic font-mono w-full text-sm mb-6">
        (honorable mentions)
      </p>
      <div className="w-full flex flex-wrap justify-center p-1 border border-white rounded">
        <TechIcon icon={SiVisualstudiocode} name="VSCode" />
        <TechIcon icon={SiKubernetes} name="Kubernetes" />
        <TechIcon icon={SiPython} name="Python" />
        <TechIcon icon={SiNeo4J} name="Neo4J" />
        <TechIcon icon={SiPostgresql} name="Postgres" />
        <TechIcon icon={SiMongodb} name="MongoDB" />
        <TechIcon icon={SiTailwindcss} name="Tailwindcss" />
        <TechIcon icon={SiTypescript} name="Typescript" />
        <TechIcon icon={SiGit} name="Git" />
        <TechIcon icon={SiAmazonaws} name="Amazon AWS" />
        <TechIcon icon={SiDigitalocean} name="Digitalocean" />
        <TechIcon icon={SiVercel} name="Vercel" />
        <TechIcon icon={SiRabbitmq} name="RabbitMQ" />
        <TechIcon icon={SiGraphql} name="GraphQL" />
        <TechIcon icon={SiRedis} name="Redis" />
        <TechIcon icon={SiGithub} name="Github" />
        <TechIcon icon={SiAdobecreativecloud} name="Creative Cloud" />
        <TechIcon icon={SiFigma} name="Figma" />
        <TechIcon icon={SiGrafana} name="Grafana" />
        <TechIcon icon={SiPrometheus} name="Prometheus" />
        <TechIcon icon={SiShopify} name="Shopify" />
      </div>
    </div>
  );
}
