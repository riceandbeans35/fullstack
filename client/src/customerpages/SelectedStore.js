import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

const SelectedStore = ({ match }) => {
  const merchantId = useParams();
  const [items, setItems] = useState([]);
  const [store, setStore] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:3001/merchantstore/${merchantId.id}`)
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });

    Axios.get(`http://localhost:3001/storename/${merchantId.id}`)
      .then((response) => {
        setStore(response.data);
      })
      .catch((error) => {
        console.error("Error fetching store data:", error);
      });
  }, [merchantId]);

  return (
    <div className="store-page">
      {store.map((store) => (
        <ul key={store.id}>
          <h2>{store.store}</h2>
        </ul>
      ))}
      <ul>
        {items.map((item) => (
          <ul key={item.inventory_id}>
            <p>
              <strong>{item.item_name}</strong>
            </p>
            <p>Price: ${item.item_price.toFixed(2)}</p>
            <p>Quantity: {item.item_quantity}</p>
          </ul>
        ))}
      </ul>
    </div>
  );
};

export default SelectedStore;
