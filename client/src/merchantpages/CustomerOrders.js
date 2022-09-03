import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MerchantNavbar from "../components/MerchantNavbar";
import { io } from "socket.io-client";
import { useSnackbar } from "notistack";
import CustomPagination from "../components/CustomPagination";
import "../styles/CustomerOrders.css";

const CustomerOrders = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const parameters = useParams();
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 5;

  const totalPages = Math.ceil(orderHistory.length / itemsPerPage);

  const handlePageChange = (selected) => {
    setCurrentPage(selected);
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = orderHistory.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

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
        setOrderHistory(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  const calculateSubtotal = (items) => {
    return items
      .reduce((acc, item) => acc + item.item_quantity * item.item_price, 0)
      .toFixed(2);
  };

  return (
    <div>
      <MerchantNavbar />
      <h2>Customer Orders</h2>
      {currentOrders.map((order, index) => (
        <div key={order.order_number} className="order-list">
          <h3>Order Number: {order.order_number}</h3>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item) => (
                <tr key={item.item_name}>
                  <td>{item.item_name}</td>
                  <td>{item.item_quantity}</td>
                  <td>${item.item_price}</td>
                </tr>
              ))}
              <tr className="subtotal-text">
                <td colSpan="2">Subtotal:</td>
                <td>${calculateSubtotal(order.items)}</td>
              </tr>
            </tbody>
          </table>
          {index !== currentOrders.length - 1 && (
            <hr className="order-separator" />
          )}
        </div>
      ))}

      <CustomPagination
        pageCount={totalPages}
        currentPage={currentPage + 1}
        onPageChange={handlePageChange}
      />
      <div className="center-button">
        <button
          onClick={() => {
            navigate(`/merchantdashboard/${parameters.merchant_id}`);
          }}
          className="bottom-buttons"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default CustomerOrders;
