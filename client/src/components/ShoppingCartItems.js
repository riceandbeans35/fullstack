import React from "react";

const ShoppingCartItems = ({ item }) => {
  const subtotal = item.item_price * item.quantity;

  return (
    <div>
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
