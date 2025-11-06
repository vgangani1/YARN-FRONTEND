import React, { useState, useEffect } from "react";

function YarnManager() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedDealer, setSelectedDealer] = useState("");

  useEffect(() => {
    fetch("https://yarn-backend-eight.vercel.app/yarn-data")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  // Filter logic
  const filteredData = data.filter((item) => {
    return (
      (item["ITEM NAME"]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item["BRAND"]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item["DEALER"]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item["SALES MAN"]?.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedBrand ? item["BRAND"] === selectedBrand : true) &&
      (selectedDealer ? item["DEALER"] === selectedDealer : true)
    );
  });

  // Unique dropdown values
  const uniqueBrands = [...new Set(data.map((item) => item["BRAND"]))];
  const uniqueDealers = [...new Set(data.map((item) => item["DEALER"]))];

  return (
    <div className="table-container">
      <h2
        style={{
          textAlign: "center",
          color: "#1e3a8a",
          fontSize: "24px",
          marginBottom: "20px",
        }}
      >
        Yarn Company Dashboard
      </h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Search anything..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
        >
          <option value="">Filter by Brand</option>
          {uniqueBrands.map((brand, index) => (
            <option key={index} value={brand}>
              {brand}
            </option>
          ))}
        </select>
        <select
          value={selectedDealer}
          onChange={(e) => setSelectedDealer(e.target.value)}
        >
          <option value="">Filter by Dealer</option>
          {uniqueDealers.map((dealer, index) => (
            <option key={index} value={dealer}>
              {dealer}
            </option>
          ))}
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>ITEM NAME</th>
            <th>BRAND</th>
            <th>DEALER</th>
            <th>SALES MAN</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, index) => (
            <tr key={index}>
              <td>{row["ITEM NAME"]}</td>
              <td>{row["BRAND"]}</td>
              <td>{row["DEALER"]}</td>
              <td>{row["SALES MAN"]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredData.length === 0 && (
        <p style={{ textAlign: "center", color: "#6b7280", marginTop: "20px" }}>
          No matching results found.
        </p>
      )}
    </div>
  );
}

export default YarnManager;
