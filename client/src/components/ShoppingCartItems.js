import React from "react";

const ShoppingCartItems = ({ item }) => {
  return (
    <div>
      <p>
        <strong> Item: {item.item_name} </strong>
      </p>
      <p>Price: ${item.item_price}</p>
      <p>Quantity: {item.quantity}</p>
    </div>
  );
};

export default ShoppingCartItems;
