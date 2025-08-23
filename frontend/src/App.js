import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import DataTable from "./components/DataTable";

function App() {
  const [ip, setIp] = useState("");
  const [error, setError] = useState("");
  const [results, setResults] = useState([]);
  const fetchIntel = async () => {
    try {
      setError("");

      const res = await fetch(`http://localhost:5000/api/intel?ip=${ip}`);
      if (!res.ok) throw new Error("Failed to fetch data");
      const json = await res.json();

      setResults((prev) =>
        [json, ...prev.filter((i) => i.ip !== json.ip)].slice(0, 10)
      );

      setIp("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>IP Threat Intelligence</h1>

      <SearchBar ip={ip} setIp={setIp} onSearch={fetchIntel} />

      {error && <p style={{ color: "red" }}>{error}</p>}

      {results.length > 0 && <DataTable data={results} />}
    </div>
  );
}

export default App;
