import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

export default function YarnManager() {
  const [data, setData] = useState([]);
  const [pending, setPending] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:4000/data");
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setPending(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  if (pending) return <p>Loading...</p>;

  const columns = Object.keys(data[0] || {}).map((key) => ({
    name: key,
    selector: (row) => row[key],
    sortable: true,
  }));

  return (
    <div>
      <h3 style={{ marginBottom: 20 }}>Yarn Manager Data</h3>
      <DataTable
        columns={columns}
        data={data}
        pagination
        highlightOnHover
        dense
      />
    </div>
  );
}
