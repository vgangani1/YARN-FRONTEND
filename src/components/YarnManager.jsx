import React, { useEffect, useState } from "react";

function YarnManager() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [dealerFilter, setDealerFilter] = useState("");

  useEffect(() => {
    fetch("https://yarn-backend-1.onrender.com/data")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const uniqueBrands = [...new Set(data.map((item) => item.BRAND))];
  const uniqueDealers = [...new Set(data.map((item) => item.DEALER))];

  const filteredData = data.filter((item) => {
    const matchesSearch =
      item["ITEM NAME"].toLowerCase().includes(search.toLowerCase()) ||
      item.BRAND.toLowerCase().includes(search.toLowerCase()) ||
      item.DEALER.toLowerCase().includes(search.toLowerCase()) ||
      item["SALES MAN"].toLowerCase().includes(search.toLowerCase());

    const matchesBrand = brandFilter ? item.BRAND === brandFilter : true;
    const matchesDealer = dealerFilter ? item.DEALER === dealerFilter : true;

    return matchesSearch && matchesBrand && matchesDealer;
  });

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Yarn Company Dashboard</h1>

      <div style={styles.filters}>
        <input
          type="text"
          placeholder="🔍 Search anything..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />

        <select
          value={brandFilter}
          onChange={(e) => setBrandFilter(e.target.value)}
          style={styles.select}
        >
          <option value="">Filter by Brand</option>
          {uniqueBrands.map((brand, i) => (
            <option key={i} value={brand}>
              {brand}
            </option>
          ))}
        </select>

        <select
          value={dealerFilter}
          onChange={(e) => setDealerFilter(e.target.value)}
          style={styles.select}
        >
          <option value="">Filter by Dealer</option>
          {uniqueDealers.map((dealer, i) => (
            <option key={i} value={dealer}>
              {dealer}
            </option>
          ))}
        </select>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>ITEM NAME</th>
              <th>BRAND</th>
              <th>DEALER</th>
              <th>SALES MAN</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item["ITEM NAME"]}</td>
                <td>{item.BRAND}</td>
                <td>{item.DEALER}</td>
                <td>{item["SALES MAN"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
  },
  title: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
  },
  filters: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    width: "200px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  select: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "#fff",
  },
  th: {
    background: "#4682B4",
    color: "white",
    padding: "10px",
  },
  td: {
    border: "1px solid #ddd",
    padding: "10px",
  },
};

export default YarnManager;
