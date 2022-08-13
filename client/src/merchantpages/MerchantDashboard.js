import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import MerchantNavbar from "../components/MerchantNavbar";
import { io } from "socket.io-client";
import { useSnackbar } from "notistack";

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
      <h2>Merchant Dashboard</h2>
      <ul>
        <li>
          <Link to={`/inventory/${merchantId}`}>Inventory</Link>
        </li>
        <li>
          <Link to={`/customerorders/${merchantId}`}>Customer Orders</Link>
        </li>
      </ul>
    </div>
  );
};

export default MerchantDashboard;
