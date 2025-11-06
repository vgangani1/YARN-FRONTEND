import React, { useState } from "react";
import YarnManager from "./components/YarnManager";
import Dues from "./components/Dues";
import backgroundImage from "./utils/yarn-bg.jpg"; // Replace this with your yarn image
import logo from "./utils/logo.png"; // Your company logo

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("yarn");

  const handleLogin = (event) => {
    event.preventDefault();
    const code = event.target.code.value;
    if (code === "366336") {
      setIsLoggedIn(true);
    } else {
      alert("Incorrect Code!");
    }
  };

  const handleLogout = () => setIsLoggedIn(false);

  if (!isLoggedIn) {
    return (
      <div
        style={{
          height: "100vh",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          color: "white",
        }}
      >
        {/* Overlay for better readability */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          }}
        ></div>

        {/* Login Card */}
        <div
          style={{
            position: "relative",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderRadius: "16px",
            padding: "50px",
            width: "380px",
            textAlign: "center",
            boxShadow: "0px 8px 30px rgba(0,0,0,0.3)",
          }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{ width: "90px", marginBottom: "15px" }}
          />
          <h2 style={{ color: "#1e3a8a", marginBottom: "10px" }}>
            Omkar Yarn Manager
          </h2>
          <p style={{ color: "#6b7280", marginBottom: "20px" }}>
            Enter your access code to continue
          </p>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              name="code"
              placeholder="Enter Access Code"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                marginBottom: "20px",
                textAlign: "center",
                fontSize: "16px",
              }}
            />
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                backgroundColor: "#2563eb",
                color: "white",
                border: "none",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "15px",
                transition: "0.3s",
              }}
            >
              Enter
            </button>
          </form>
        </div>
      </div>
    );
  }

  // After login - main dashboard
  return (
    <div>
      <div className="navbar">
        <div className="nav-left">
          <img src={logo} alt="Logo" style={{ width: "40px" }} />
          Omkar Yarn Manager
        </div>
        <div className="nav-tabs">
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
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="main">
        {activeTab === "yarn" ? <YarnManager /> : <Dues />}
      </div>
    </div>
  );
}

export default App;
