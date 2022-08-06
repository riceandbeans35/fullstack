import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link, useParams } from "react-router-dom";
import CustomerNavbar from "../components/CustomerNavbar";

const StoreList = () => {
  const [merchants, setMerchants] = useState([]);
  const customerId = useParams();

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
      <CustomerNavbar />
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
          <Link
            to={`/selectedstore/${merchant.id}/${customerId.id}`}
            key={merchant.id}
          >
            {merchant.store}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default StoreList;
