import React, { useState } from "react";
import YarnManager from "./components/YarnManager";
import Dues from "./components/Dues";
import logo from "./utils/logo.png";
import "./App.css";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("yarn");

  const handleLogin = (event) => {
    event.preventDefault();
    const code = event.target.code.value.trim();
    if (code === "366336") {
      setIsLoggedIn(true);
    } else {
      alert("❌ Incorrect Access Code!");
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      setIsLoggedIn(false);
    }
  };

  // 🔹 LOGIN SCREEN
  if (!isLoggedIn) {
    return (
      <div className="loginShell">
        <div className="loginCard">
          <img src={logo} alt="Logo" className="logo" />
          <h2>Omkar Yarn Manager</h2>
          <p style={{ color: "#9aa4b8", marginBottom: "16px" }}>
            Enter your secure access code
          </p>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              name="code"
              placeholder="Enter Access Code"
              className="input input--full"
            />
            <button type="submit" className="btn mt-16">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 🔹 MAIN DASHBOARD
  return (
    <div>
      {/* === NAVBAR === */}
      <div className="topbar">
        <div className="topbar__inner">
          <div className="brand-mark"></div>
          <div className="brand-title">Omkar Yarn Manager</div>

          <div className="spacer"></div>

          <div className="segment">
            <button
              onClick={() => setActiveTab("yarn")}
              className={activeTab === "yarn" ? "active" : ""}
            >
              Yarn Manager
            </button>
            <button
              onClick={() => setActiveTab("dues")}
              className={activeTab === "dues" ? "active" : ""}
            >
              Dues
            </button>
          </div>

          <div className="spacer"></div>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* === MAIN PAGE === */}
      <div className="page">
        {activeTab === "yarn" ? <YarnManager /> : <Dues />}
      </div>
    </div>
  );
}
