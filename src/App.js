import React, { useEffect, useState } from "react";
import YarnManager from "./components/YarnManager";
import Dues from "./components/Dues";
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [activeTab, setActiveTab] = useState("yarn");
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [dealerFilter, setDealerFilter] = useState("");

  // ✅ Fetch Excel data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://yarn-backend-eight.vercel.app/yarn-data");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  // ✅ Filter data for search and dropdown
  const filteredData = data.filter((item) => {
    const itemName = item["ITEM NAME"]?.toLowerCase() || "";
    const brand = item.BRAND?.toLowerCase() || "";
    const dealer = item.DEALER?.toLowerCase() || "";

    const matchesSearch =
      itemName.includes(searchQuery.toLowerCase()) ||
      brand.includes(searchQuery.toLowerCase()) ||
      dealer.includes(searchQuery.toLowerCase());

    const matchesBrand = brandFilter ? brand === brandFilter.toLowerCase() : true;
    const matchesDealer = dealerFilter ? dealer === dealerFilter.toLowerCase() : true;

    return matchesSearch && matchesBrand && matchesDealer;
  });

  return (
    <div className="App">
      <nav className="navbar">
        <h1 className="nav-title">Omkar Yarn Manager</h1>
        <div className="nav-buttons">
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
          <button className="logout-btn" onClick={() => setLoggedIn(false)}>
            Logout
          </button>
        </div>
      </nav>

      <main className="content">
        {activeTab === "yarn" ? (
          <YarnManager
            data={filteredData}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            brandFilter={brandFilter}
            setBrandFilter={setBrandFilter}
            dealerFilter={dealerFilter}
            setDealerFilter={setDealerFilter}
          />
        ) : (
          <Dues />
        )}
      </main>
    </div>
  );
}

export default App;
