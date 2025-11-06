import React, { useEffect, useState } from "react";
import YarnManager from "./components/YarnManager";
import Dues from "./components/Dues";
import logo from "./utils/logo.png";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("yarn");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [dealerFilter, setDealerFilter] = useState("");

  // ✅ Fetch data (same backend, safe & simple)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://yarn-backend-eight.vercel.app/yarn-data");
        const result = await res.json();
        setData(result);
        setFilteredData(result);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  // ✅ Fix search logic
  useEffect(() => {
    const q = searchQuery.toLowerCase().trim();
    const filtered = data.filter((row) => {
      const combinedText = Object.values(row).join(" ").toLowerCase();
      return (
        combinedText.includes(q) &&
        (brandFilter ? row.BRAND === brandFilter : true) &&
        (dealerFilter ? row.DEALER === dealerFilter : true)
      );
    });
    setFilteredData(filtered);
  }, [searchQuery, brandFilter, dealerFilter, data]);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  if (!isLoggedIn) {
    return (
      <div className="login-page">
        <div className="login-box">
          <img src={logo} alt="Omkar Filaments" className="login-logo" />
          <h2>Omkar Yarn Manager</h2>
          <input
            type="password"
            placeholder="Enter Access Code"
            className="login-input"
          />
          <button onClick={handleLogin} className="login-button">
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="navbar">
        <div className="navbar-title">Omkar Yarn Manager</div>
        <div className="navbar-actions">
          <button
            className={activeTab === "yarn" ? "active" : ""}
            onClick={() => setActiveTab("yarn")}
          >
            Yarn Manager
          </button>
          <button
            className={activeTab === "dues" ? "active" : ""}
            onClick={() => setActiveTab("dues")}
          >
            Dues
          </button>
          <button className="logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <main className="content">
        {activeTab === "yarn" && (
          <YarnManager
            data={filteredData}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            brandFilter={brandFilter}
            setBrandFilter={setBrandFilter}
            dealerFilter={dealerFilter}
            setDealerFilter={setDealerFilter}
          />
        )}
        {activeTab === "dues" && <Dues />}
      </main>
    </div>
  );
}

export default App;
