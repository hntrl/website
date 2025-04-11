import { useEffect, useState } from "react";

interface Props {
  owner?: string;
  repo: string;
  children: React.ReactNode;
}

export default function StargazersCount({ owner = "hntrl", repo, children }: Props) {
  const [stargazersCount, setStargazersCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
      const data = await response.json();
      setStargazersCount(data.stargazers_count);
    };

    fetchData();
  }, []);

  if (!stargazersCount) {
    return null;
  }

  return (
    <div
      className="flex items-center gap-1 text-xs text-zinc-400 rounded-md px-2 py-1 bg-zinc-800"
      title={`starred ${stargazersCount} times on GitHub`}
    >
      {children}
      <div>{stargazersCount}</div>
    </div>
  );
}
