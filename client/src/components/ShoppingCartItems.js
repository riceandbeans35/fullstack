import React from "react";
import "../styles/Checkout.css";

const ShoppingCartItems = ({ item }) => {
  const subtotal = item.item_price * item.quantity;

  return (
    <div className="card">
      <p>
        <strong> Item: {item.item_name} </strong>
      </p>
      <p>Price: ${item.item_price.toFixed(2)}</p>
      <p>Quantity: {item.quantity}</p>
      <p>Subtotal: ${subtotal.toFixed(2)}</p>
    </div>
  );
};

export default ShoppingCartItems;
