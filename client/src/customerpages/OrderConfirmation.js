import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
  const parameters = useParams();
  const [orderDetails, setOrderDetails] = useState(null);

  const navigate = useNavigate();

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
      <h2>Order Confirmation</h2>
      <p>Order Number: {parameters.order_number}</p>

      <h3>Order Details:</h3>
      <ul>
        {orderDetails.map((order) => (
          <li key={order.order_number}>
            {order.item_name} - Quantity: {order.item_quantity} - Price: $
            {order.item_price.toFixed(2)}
          </li>
        ))}
      </ul>
      <p>Total Amount: ${totalAmount.toFixed(2)}</p>
      <button
        onClick={() => {
          navigate(`/storelist/${parameters.customer_id}`);
        }}
      >
        Back to Store List
      </button>
    </div>
  );
};

export default OrderConfirmation;
