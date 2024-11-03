import { useState, useEffect } from "react";
import GithubData from "./components/GithubData";
import "./App.css";

interface TestData {
  id: number;
  place_holder: string;
}

function App() {
  const [data, setData] = useState<TestData[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/tests`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Erreur :", error));
  }, []);

  return (
    <>
      <div>
        <h1>tests</h1>
        <h2>Github test</h2>
        <GithubData />
        <h2>Données de Test</h2>
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.place_holder}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
