import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const OrderForm = () => {
  const [customer, setCustomer] = useState([]);
  const [store, setStore] = useState([]);
  const parameters = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    Axios.get(`http://localhost:3001/storename/${parameters.id}`)
      .then((response) => {
        setStore(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching store data:", error);
      });

    Axios.get(`http://localhost:3001/customer/${parameters.customer_id}`)
      .then((response) => {
        setCustomer(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching store data:", error);
      });
  }, [parameters]);

  const storename = store.map((store) => ({
    store: store.store,
  }));

  const customerdata = customer.map((customer) => ({
    customer_email: customer.customer_email,
    customer_name: customer.customer_name,
  }));

  const orderItem = useSelector((state) => {
    return state.cart;
  });

  const orderItems = orderItem.map((item) => ({
    inventory_id: item.inventory_id,
    item_name: item.item_name,
    item_price: item.item_price,
    item_quantity: item.quantity,
  }));

  function generateRandomOrderNumber() {
    return Math.floor(Math.random() * 1000000) + 1;
  }

  const randomOrderNumber = generateRandomOrderNumber();

  const submitOrder = () => {
    const data = {
      order_number: randomOrderNumber,
      merchant_id: parameters.id,
      customer_id: parameters.customer_id,
      order_items: orderItems,
      customer_email: customerdata[0].customer_email,
      customer_name: customerdata[0].customer_name,
      store: storename[0].store,
    };

    Axios.post("http://localhost:3001/order", data)
      .then((response) => {
        console.log(response.data);
        navigate(`/orderconfirmation/${data.customer_id}/${data.order_number}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <button
        className="bottom-store-checkout-button"
        onClick={() => {
          submitOrder();
        }}
      >
        Submit Order
      </button>
    </div>
  );
};

export default OrderForm;
