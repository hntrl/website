import { TbGitFork } from "react-icons/tb";
import { AiOutlineStar } from "react-icons/ai";

const projects = [
  {
    name: "mystickerspace.com",
    label: "Client project",
    link: "https://mystickerspace.com",
    description:
      "Storefront and commerce engine for a local made-to-order sticker print shop",
    language: {
      color: "#61dafb",
      name: "React, Hyper",
    },
  },
  {
    name: "hyper",
    label: null,
    link: "https://github.com/hntrl/lang",
    repo: "hntrl/lang",
    description: "🐸 A backend language and framework for distributed systems",
    language: {
      color: "#0da4e0",
      name: "Golang",
    },
  },
  {
    name: "website",
    label: null,
    link: "https://github.com/hntrl/website",
    repo: "hntrl/website",
    description: "🚗 This very website",
    language: {
      color: "#61dafb",
      name: "React",
    },
  },
];

type RepositoryInfo = {
  stargazers_count: number;
  forks: number;
};

async function GithubStats({ repo }: { repo: string }) {
  const result = await fetch(`https://api.github.com/repos/${repo}`);
  const info = (await result.json()) as RepositoryInfo;
  return (
    <div className="ml-4 flex items-center gap-3">
      <div className="flex items-center gap-1">
        <AiOutlineStar />
        {info.stargazers_count}
      </div>
      <div className="flex items-center gap-1">
        <TbGitFork />
        {info.forks}
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <div className="mb-12">
      <h1 className="lowercase mb-6 text-2xl font-mono font-semibold">
        Past Projects
      </h1>
      <div className="md:w-4/5">
        {projects.map((project, idx) => (
          <a
            key={idx}
            rel="noopener noreferrer"
            target="_blank"
            href={project.link}
            className="flex flex-col p-4 h-36 mb-2 rounded-md transition-colors border border-neutral-600 hover:border-white cursor-pointer"
          >
            <div>
              <h3 className="font-semibold mb-1 leading-3 mt-1">
                {project.name}
              </h3>
              {project.label ? (
                <p className="text-sm -skew-x-6 leading-4">{project.label}</p>
              ) : null}
            </div>
            <div className="mb-auto basis-full mt-1 text-white">
              {project.description}
            </div>
            <div className="text-sm flex items-center">
              <div className="flex items-center">
                <div
                  className="w-1.5 h-1.5 mr-1.5 rounded-full"
                  style={{ backgroundColor: project.language.color }}
                />
                {project.language.name}
              </div>
              {/* @ts-expect-error Async Server Component */}
              {project.repo ? <GithubStats repo={project.repo} /> : null}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
