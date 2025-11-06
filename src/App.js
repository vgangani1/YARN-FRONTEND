import React, { useState } from "react";
import YarnManager from "./components/YarnManager";
import Dues from "./components/Dues";
import logo from "./utils/logo.png";

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

  if (!isLoggedIn) {
    return (
      <div style={styles.loginContainer}>
        <div style={styles.loginBox}>
          <img src={logo} alt="Logo" style={styles.logo} />
          <h2>Omkar Yarn Manager</h2>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              name="code"
              placeholder="Enter Access Code"
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

  return (
    <div style={{ backgroundColor: "#f9fafc", minHeight: "100vh" }}>
      <div style={styles.navbar}>
        <div style={styles.navLeft}>
          <img src={logo} alt="Logo" style={styles.navLogo} />
          <span style={styles.navTitle}>Omkar Yarn Manager</span>
        </div>

        <div style={styles.navTabs}>
          <button
            onClick={() => setActiveTab("yarn")}
            style={activeTab === "yarn" ? styles.activeTab : styles.tab}
          >
            Yarn Manager
          </button>
          <button
            onClick={() => setActiveTab("dues")}
            style={activeTab === "dues" ? styles.activeTab : styles.tab}
          >
            Dues
          </button>
        </div>

        <button onClick={handleLogout} style={styles.logout}>
          Logout
        </button>
      </div>

      <div style={{ padding: "20px" }}>
        {activeTab === "yarn" ? <YarnManager /> : <Dues />}
      </div>
    </div>
  );
}

const styles = {
  // Login Page
  loginContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(to right, #1e3a8a, #3b82f6)",
  },
  loginBox: {
    textAlign: "center",
    background: "#fff",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
    width: "320px",
  },
  logo: {
    width: "120px",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
  },

  // Navbar
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#2563eb",
    color: "white",
    padding: "10px 20px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },
  navLeft: {
    display: "flex",
    alignItems: "center",
  },
  navLogo: {
    width: "40px",
    height: "40px",
    marginRight: "10px",
  },
  navTitle: {
    fontSize: "18px",
    fontWeight: "600",
  },
  navTabs: {
    display: "flex",
    gap: "10px",
  },
  tab: {
    backgroundColor: "transparent",
    border: "1px solid white",
    color: "white",
    borderRadius: "6px",
    padding: "6px 14px",
    cursor: "pointer",
  },
  activeTab: {
    backgroundColor: "white",
    color: "#2563eb",
    border: "none",
    borderRadius: "6px",
    padding: "6px 14px",
    cursor: "pointer",
    fontWeight: "600",
  },
  logout: {
    backgroundColor: "#ef4444",
    border: "none",
    color: "white",
    padding: "6px 14px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default App;
