import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

const StoreList = () => {
  const [merchants, setMerchants] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/storelist")
      .then((response) => {
        setMerchants(response.data);
      })
      .catch((error) => {
        console.error("Error fetching store data:", error);
      });
  }, []);

  return (
    <div>
      <h2>List of Stores</h2>
      <ul
        style={{
          listStyleType: "none",
          padding: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {merchants.map((merchant) => (
          <Link to={`/selectedstore/${merchant.id}`} key={merchant.id}>
            {merchant.store}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default StoreList;
