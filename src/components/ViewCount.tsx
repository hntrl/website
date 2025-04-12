import { useEffect, useState } from "react";

interface Props {
  path: string;
  children: React.ReactNode;
}

export default function ViewCount({ path, children }: Props) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://cf-counter.hunter-cf3.workers.dev${path}`);
      const data = await response.json();
      setCount(data.value);
    };
    fetchData();
  }, []);

  return (
    <div className="transition" style={{ opacity: count > 0 ? 1 : 0 }}>
      {children}
      {count.toLocaleString()} views
    </div>
  );
}
