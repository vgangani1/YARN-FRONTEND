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

  // ✅ Correct fetch URL and safe CORS handling
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://yarn-backend-eight.vercel.app/api/yarn-data",
          {
            headers: { "Content-Type": "application/json" },
            mode: "cors",
          }
        );

        if (!response.ok) throw new Error("Failed to fetch data");

        const result = await response.json();
        setData(result);
        setFilteredData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
        setFilteredData([]);
      }
    };

    fetchData();
  }, []);

  // ✅ Smarter filtering for “20/1 SD”, “20/1 MONO” etc.
  useEffect(() => {
    const query = searchQuery.toLowerCase().trim();

    const filtered = data.filter((row) => {
      const combinedText = Object.values(row).join(" ").toLowerCase();
      return (
        combinedText.includes(query) &&
        (brandFilter ? row.BRAND === brandFilter : true) &&
        (dealerFilter ? row.DEALER === dealerFilter : true)
      );
    });

    setFilteredData(filtered);
  }, [searchQuery, brandFilter, dealerFilter, data]);

  // ✅ Simple login logic (no backend auth)
  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  // ✅ LOGIN PAGE UI
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

  // ✅ DASHBOARD PAGE UI
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
