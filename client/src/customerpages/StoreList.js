import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link, useParams } from "react-router-dom";
import CustomerNavbar from "../components/CustomerNavbar";
import "../styles/StoreList.css";
import store from "../assets/store.jpeg";

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
      <h2 className="center">Atlas Stores</h2>
      <div className="card-container">
        {merchants.map((merchant) => (
          <div className="card" key={merchant.id}>
            <Link
              to={`/selectedstore/${merchant.id}/${customerId.id}`}
              className="card-link"
              key={merchant.id}
            >
              <img src={store} alt={merchant.store} className="card-image" />
              <div className="card-description">
                <p>
                  <strong>{merchant.store}</strong>
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreList;
