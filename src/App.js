import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://yarn-backend-1.onrender.com/data")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Excel Data:", data);
        setData(data);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Yarn Data</h1>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>ITEM NAME</th>
            <th>BRAND</th>
            <th>DEALER</th>
            <th>SALES MAN</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              <td>{row["ITEM NAME"]}</td>
              <td>{row["BRAND"]}</td>
              <td>{row["DEALER"]}</td>
              <td>{row["SALES MAN"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
