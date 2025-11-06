import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import logo from "../utils/logo.png";

export default function Login({ firebaseAuth, onCodeLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      // onAuthStateChanged in App.jsx will handle post-login UI
    } catch (err) {
      console.error("Firebase login error:", err);
      setError("Invalid email or password.");
    }
  };

  const handleCodeLogin = (e) => {
    e.preventDefault();
    setError("");
    const ok = onCodeLogin(code.trim());
    if (!ok) setError("Invalid access code.");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#e6f4ff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: 40,
          borderRadius: 12,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: 400,
          textAlign: "center"
        }}
      >
        <img
          src={logo}
          alt="Omkar Filaments"
          style={{ width: 180, height: "auto", display: "block", margin: "0 auto 20px" }}
        />
        <h2 style={{ marginBottom: 10, color: "#333" }}>Omkar Filaments</h2>
        <p style={{ marginBottom: 25, color: "#555", fontSize: 14 }}>
          Enter email + password or use the access code
        </p>

        <form onSubmit={handleEmailLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />
          <button type="submit" style={btnBlue}>Login with Email</button>
        </form>

        <p style={{ margin: "15px 0", color: "#888", fontSize: 13 }}>or</p>

        <form onSubmit={handleCodeLogin}>
          <input
            type="text"
            placeholder="Enter access code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            style={inputStyle}
          />
          <button type="submit" style={btnGreen}>Login with Code</button>
        </form>

        {error && <p style={{ color: "red", marginTop: 15, fontSize: 13 }}>{error}</p>}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: 10,
  marginBottom: 12,
  borderRadius: 6,
  border: "1px solid #ccc",
  fontSize: 14,
  outline: "none"
};

const btnBlue = {
  width: "100%",
  backgroundColor: "#007bff",
  color: "white",
  padding: 10,
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  fontSize: 15
};

const btnGreen = {
  width: "100%",
  backgroundColor: "#28a745",
  color: "white",
  padding: 10,
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  fontSize: 15
};
