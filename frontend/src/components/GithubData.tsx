import { Key, useEffect, useState } from "react";
import { fetchProjectIssues } from "../service/api";

function GithubData() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchProjectIssues(
          "Alaaric",
          "ProjectOverView",
          "all"
        );
        setData(result);
      } catch (error) {
        setError("Failed to load data from GitHub.");
      }
    };

    getData();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <ul>
        {data.map((issue: { id: Key; title: string }) => (
          <li key={issue.id}>{issue.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default GithubData;
