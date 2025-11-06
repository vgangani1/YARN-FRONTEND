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
    <div>
      <div style={styles.navbar}>
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
      <div style={{ padding: "20px" }}>
        {activeTab === "yarn" ? <YarnManager /> : <Dues />}
      </div>
    </div>
  );
}

const styles = {
  loginContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#87CEEB",
  },
  loginBox: {
    textAlign: "center",
    background: "#fff",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
  },
  logo: {
    width: "120px",
    marginBottom: "20px",
  },
  input: {
    width: "200px",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  button: {
    width: "220px",
    padding: "10px",
    borderRadius: "8px",
    backgroundColor: "#4682B4",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  navbar: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#87CEEB",
    padding: "10px",
  },
  tab: {
    background: "white",
    border: "1px solid #ccc",
    padding: "10px 30px",
    margin: "0 5px",
    borderRadius: "10px",
    cursor: "pointer",
  },
  activeTab: {
    background: "#4682B4",
    color: "white",
    border: "none",
    padding: "10px 30px",
    margin: "0 5px",
    borderRadius: "10px",
    cursor: "pointer",
  },
};

export default App;
