import React, { useState } from "react";
import YarnManager from "./components/YarnManager";
import Dues from "./components/Dues";
import logo from "./utils/logo.png";
import yarnBackground from "./utils/yarn-bg.jpg"; // background image

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

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // -------------------------
  // LOGIN PAGE DESIGN
  // -------------------------
  if (!isLoggedIn) {
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          backgroundImage: `url(${yarnBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        {/* overlay to soften background */}
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

        {/* login card */}
        <div
          style={{
            position: "relative",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderRadius: "16px",
            padding: "50px 40px",
            width: "380px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            textAlign: "center",
          }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{ width: "90px", marginBottom: "20px" }}
          />
          <h2
            style={{
              color: "#1E3A8A",
              marginBottom: "10px",
              fontWeight: "700",
            }}
          >
            Omkar Yarn Manager
          </h2>
          <p
            style={{
              color: "#6B7280",
              marginBottom: "25px",
              fontSize: "14px",
            }}
          >
            Enter your secure access code to continue
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
                border: "1px solid #D1D5DB",
                textAlign: "center",
                fontSize: "15px",
                marginBottom: "20px",
                outline: "none",
              }}
            />
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                backgroundColor: "#2563EB",
                color: "white",
                border: "none",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "15px",
                transition: "0.3s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#1D4ED8")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#2563EB")}
            >
              Enter
            </button>
          </form>
        </div>
      </div>
    );
  }

  // -------------------------
  // MAIN DASHBOARD
  // -------------------------
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f9fafc",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {/* Top Navbar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 30px",
          background: "linear-gradient(to right, #2563EB, #1E40AF)",
          color: "white",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src={logo}
            alt="Logo"
            style={{ width: "35px", borderRadius: "50%" }}
          />
          <h2 style={{ fontSize: "18px", fontWeight: "600" }}>
            Omkar Yarn Manager
          </h2>
        </div>

        <div>
          <button
            onClick={() => setActiveTab("yarn")}
            style={{
              backgroundColor:
                activeTab === "yarn" ? "rgba(255,255,255,0.2)" : "transparent",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "6px",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            Yarn Manager
          </button>
          <button
            onClick={() => setActiveTab("dues")}
            style={{
              backgroundColor:
                activeTab === "dues" ? "rgba(255,255,255,0.2)" : "transparent",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "6px",
              cursor: "pointer",
              marginRight: "20px",
            }}
          >
            Dues
          </button>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "#DC2626",
              border: "none",
              padding: "8px 18px",
              borderRadius: "8px",
              color: "white",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Page Section */}
      <div style={{ padding: "30px" }}>
        {activeTab === "yarn" ? <YarnManager /> : <Dues />}
      </div>
    </div>
  );
}

export default App;
