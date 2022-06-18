import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";

const CustomerOrders = () => {
  const [orders, setOrders] = useState([]);
  const merchantId = useParams();

  useEffect(() => {
    Axios.get(`http://localhost:3001/customerorder/${merchantId.merchant_id}`)
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
    </div>
  );
};

export default CustomerOrders;
