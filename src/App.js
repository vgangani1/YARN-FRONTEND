import React, { useState, useEffect } from "react";
import logo from "./utils/logo.png";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedDealer, setSelectedDealer] = useState("");
  const [activeTab, setActiveTab] = useState("yarn");

  // ✅ Login handler
  const handleLogin = (event) => {
    event.preventDefault();
    const code = event.target.code.value;
    if (code === "366336") {
      setIsLoggedIn(true);
    } else {
      alert("Incorrect Code!");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // ✅ Fetch Excel data from backend
  useEffect(() => {
    fetch("https://yarn-backend-eight.vercel.app/yarn-data")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  // ✅ Improved Search — supports partial & multi-word match
  const filteredData = data.filter((item) => {
    const searchWords = searchTerm.toLowerCase().split(" ").filter(Boolean);
    const itemText = Object.values(item)
      .join(" ")
      .toLowerCase();

    const matchesSearch = searchWords.every((word) =>
      itemText.includes(word)
    );

    return (
      matchesSearch &&
      (selectedBrand ? item["BRAND"] === selectedBrand : true) &&
      (selectedDealer ? item["DEALER"] === selectedDealer : true)
    );
  });

  // Dropdowns
  const uniqueBrands = [...new Set(data.map((item) => item["BRAND"]))];
  const uniqueDealers = [...new Set(data.map((item) => item["DEALER"]))];

  // ✅ Login Page
  if (!isLoggedIn) {
    return (
      <div style={styles.loginContainer}>
        <div style={styles.loginBox}>
          <img src={logo} alt="Omkar Logo" style={styles.logo} />
          <h2 style={styles.title}>Omkar Yarn Manager</h2>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              name="code"
              placeholder="Enter access code"
              style={styles.input}
            />
            <button type="submit" style={styles.button}>
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ✅ Dashboard Page
  return (
    <div style={styles.pageContainer}>
      <div style={styles.navbar}>
        <h3 style={styles.navTitle}>Omkar Yarn Manager</h3>
        <div>
          <button
            onClick={() => setActiveTab("yarn")}
            style={activeTab === "yarn" ? styles.activeTab : styles.tab}
          >
            Yarn Manager
          </button>
          <button
            onClick={() => setActiveTab("dues")}
            style={activeTab === "dues" ? styles.tab : styles.tab}
          >
            Dues
          </button>
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
        </div>
      </div>

      <div style={styles.tableContainer}>
        <h2 style={styles.pageTitle}>Yarn Company Dashboard</h2>

        <div style={styles.filters}>
          <input
            type="text"
            placeholder="Search anything..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            style={styles.dropdown}
          >
            <option value="">Filter by Brand</option>
            {uniqueBrands.map((brand, i) => (
              <option key={i} value={brand}>
                {brand}
              </option>
            ))}
          </select>
          <select
            value={selectedDealer}
            onChange={(e) => setSelectedDealer(e.target.value)}
            style={styles.dropdown}
          >
            <option value="">Filter by Dealer</option>
            {uniqueDealers.map((dealer, i) => (
              <option key={i} value={dealer}>
                {dealer}
              </option>
            ))}
          </select>
        </div>

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
          <p style={styles.noResults}>No matching results found.</p>
        )}
      </div>
    </div>
  );
}

// ✅ Styles
const styles = {
  // --- Login Page ---
  loginContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#dce5f3", // slightly darker, professional tone
  },
  loginBox: {
    textAlign: "center",
    background: "#fff",
    padding: "50px 60px",
    borderRadius: "14px",
    border: "1px solid #d1d5db",
    width: "360px",
  },
  logo: {
    width: "110px",
    marginBottom: "20px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "600",
    marginBottom: "25px",
    color: "#1e3a8a",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "20px",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    outline: "none",
    fontSize: "15px",
    background: "#f9fafc",
  },
  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "15px",
  },

  // --- Navbar ---
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1e3a8a",
    color: "#fff",
    padding: "12px 40px",
  },
  navTitle: {
    fontWeight: "600",
    fontSize: "18px",
  },
  tab: {
    background: "#3b82f6",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "8px 16px",
    marginLeft: "10px",
    cursor: "pointer",
  },
  activeTab: {
    background: "#60a5fa",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "8px 16px",
    marginLeft: "10px",
    cursor: "pointer",
  },
  logoutButton: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "8px 16px",
    marginLeft: "10px",
    cursor: "pointer",
  },

  // --- Table Section ---
  pageContainer: {
    background: "#f0f3f8",
    minHeight: "100vh",
  },
  tableContainer: {
    background: "#f8fafc",
    padding: "30px",
    borderRadius: "12px",
    margin: "30px auto",
    width: "90%",
  },
  pageTitle: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#1e3a8a",
  },
  filters: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  searchInput: {
    width: "220px",
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
  },
  dropdown: {
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "#fff",
  },
  noResults: {
    textAlign: "center",
    color: "#6b7280",
    marginTop: "20px",
  },
};

export default App;
