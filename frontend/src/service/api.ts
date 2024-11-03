export const fetchProjectIssues = async (
  owner: string,
  repo: string,
  state: string
) => {
  const response = await fetch(
    `${
      import.meta.env.VITE_API_URL
    }/github/repos/${owner}/${repo}/issues/${state}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch GitHub data");
  }

  return response.json();
};
