// src/App.tsx
import { useEffect, useState } from "react";

function App() {
  const [health, setHealth] = useState<string>("checking...");

  useEffect(() => {
    fetch("/api/health")
      .then(res => res.json())
      .then(data => setHealth(data.ok ? "API is healthy" : "API failed"))
      .catch(err => {
        console.error("Health check failed", err);
        setHealth("API error");
      });
  }, []);

  return (
    <div>
      <h1>Kid Demo Frontend</h1>
      <p>Backend status: {health}</p>
    </div>
  );
}

export default App;
