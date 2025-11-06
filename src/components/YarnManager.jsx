import React from "react";
import "./YarnManager.css";

function YarnManager({
  data,
  searchQuery,
  setSearchQuery,
  brandFilter,
  setBrandFilter,
  dealerFilter,
  setDealerFilter,
}) {
  const uniqueBrands = [...new Set(data.map((item) => item.BRAND))].sort();
  const uniqueDealers = [...new Set(data.map((item) => item.DEALER))].sort();

  return (
    <div className="yarn-container">
      <h2 className="yarn-title">Yarn Company Dashboard</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Search anything..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-box"
        />

        <select
          value={brandFilter}
          onChange={(e) => setBrandFilter(e.target.value)}
          className="filter-dropdown"
        >
          <option value="">Filter by Brand</option>
          {uniqueBrands.map((brand) => (
            <option key={brand}>{brand}</option>
          ))}
        </select>

        <select
          value={dealerFilter}
          onChange={(e) => setDealerFilter(e.target.value)}
          className="filter-dropdown"
        >
          <option value="">Filter by Dealer</option>
          {uniqueDealers.map((dealer) => (
            <option key={dealer}>{dealer}</option>
          ))}
        </select>
      </div>

      <div className="table-wrapper">
        <table className="yarn-table">
          <thead>
            <tr>
              <th>ITEM NAME</th>
              <th>BRAND</th>
              <th>DEALER</th>
              <th>SALES MAN</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
                  No matching results found.
                </td>
              </tr>
            ) : (
              data.map((item, idx) => (
                <tr key={idx}>
                  <td>{item["ITEM NAME"]}</td>
                  <td>{item.BRAND}</td>
                  <td>{item.DEALER}</td>
                  <td>{item["SALES MAN"]}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default YarnManager;
