import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CustomerNavbar from "../components/CustomerNavbar";

const OrderConfirmation = () => {
  const parameters = useParams();
  const [orderDetails, setOrderDetails] = useState(null);

  const navigate = useNavigate();

  const handleReloadPage = () => {
    window.location.reload();
  };

  useEffect(() => {
    Axios.get(`http://localhost:3001/order/${parameters.order_number}`)
      .then((response) => {
        setOrderDetails(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching order details:", error);
      });
  }, [parameters]);

  if (!orderDetails) {
    return <div>Loading...</div>;
  }

  const totalAmount = orderDetails.reduce((total, order) => {
    return total + order.item_price * order.item_quantity;
  }, 0);

  return (
    <div>
      <CustomerNavbar />
      <h2>Order Confirmation</h2>
      <p>Order Number: {parameters.order_number}</p>

      <p>Order Details:</p>
      <ul>
        {orderDetails.map((order) => (
          <li key={order.order_number}>
            {order.item_name} - Quantity: {order.item_quantity} - Price: $
            {order.item_price.toFixed(2)}
          </li>
        ))}
      </ul>
      <p>
        <strong>Total Amount: ${totalAmount.toFixed(2)}</strong>
      </p>
      <button
        onClick={() => {
          navigate(`/storelist/${parameters.customer_id}`);
          handleReloadPage();
        }}
        className=" store-button"
      >
        Back to Store List
      </button>
    </div>
  );
};

export default OrderConfirmation;
