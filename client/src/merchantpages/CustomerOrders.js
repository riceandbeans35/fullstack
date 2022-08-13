import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MerchantNavbar from "../components/MerchantNavbar";
import { io } from "socket.io-client";
import { useSnackbar } from "notistack";

const CustomerOrders = () => {
  const [orders, setOrders] = useState([]);
  const parameters = useParams();

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const socket = io("ws://localhost:3002");

  socket.on("connection", () => {
    console.log("Connected to WebSocket server");
  });

  socket.on("orderNotification", (data) => {
    if (window.location.pathname === `/customerorders/${data.merchantId}`) {
      enqueueSnackbar(
        `${data.customerName} placed an order from your store ${data.storeName}`
      );
    }
  });
  useEffect(() => {
    Axios.get(`http://localhost:3001/customerorder/${parameters.merchant_id}`)
      .then((response) => {
        setOrders(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  return (
    <div>
      <MerchantNavbar />
      <h2>Customer Orders</h2>
      <table>
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Customer Name</th>
            <th>Item Name</th>
            <th>Item Price</th>
            <th>Item Quantity</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.order_number}>
              <td>{order.customer_id}</td>
              <td>{order.customer_name}</td>
              <td>{order.item_name}</td>
              <td>{order.item_price}</td>
              <td>{order.item_quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={() => {
          navigate(`/merchantdashboard/${parameters.merchant_id}`);
        }}
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default CustomerOrders;
