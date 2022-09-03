import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import MerchantNavbar from "../components/MerchantNavbar";
import { io } from "socket.io-client";
import { useSnackbar } from "notistack";
import inventory from "../assets/inventory.jpeg";
import orders from "../assets/order.png";
import "../styles/MerchantDashboard.css";

const MerchantDashboard = () => {
  const [merchantId, setMerchantId] = useState(null);
  const { id } = useParams();

  const { enqueueSnackbar } = useSnackbar();

  const socket = io("ws://localhost:3002");

  socket.on("connection", () => {
    console.log("Connected to WebSocket server");
  });

  socket.on("orderNotification", (data) => {
    if (window.location.pathname === `/merchantdashboard/${data.merchantId}`) {
      enqueueSnackbar(
        `${data.customerName} placed an order from your store ${data.storeName}`
      );
    }
  });

  useEffect(() => {
    const MerchantId = id;

    setMerchantId(MerchantId);
  }, [id]);

  return (
    <div>
      <MerchantNavbar />
      <h2 className="header">Merchant Dashboard</h2>
      <div className="card-container">
        <div className="card">
          <Link to={`/inventory/${merchantId}`} className="card-link">
            <img src={inventory} alt="Inventory" className="card-image" />
            <div className="card-description">
              <p>
                <strong>Manage and View Inventory</strong>
              </p>
            </div>
          </Link>
        </div>
        <div className="card">
          <Link to={`/customerorders/${merchantId}`} className="card-link">
            <img src={orders} alt="Orders" className="card-image" />
            <div className="card-description">
              <p>
                <strong>View Orders</strong>
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MerchantDashboard;
