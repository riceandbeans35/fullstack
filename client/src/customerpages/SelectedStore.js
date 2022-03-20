import React, { useEffect, useState } from "react";

const SelectedStore = ({ match }) => {
  const storeId = match.params.storeId;
  const [store, setStore] = useState({});
  const [items, setItems] = useState([]);

  useEffect(() => {}, [storeId]);

  return (
    <div className="store-page">
      <h1>{store.store_name}</h1>
      <h2>Items for Sale:</h2>
      <ul>
        {items.map((item) => (
          <li key={item.item_id}>
            <p>{item.name}</p>
            <p>Price: ${item.price.toFixed(2)}</p>
            <p>Quantity: {item.quantity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectedStore;
