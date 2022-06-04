import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { add } from "../redux/cartSlice";

const SelectedStore = ({ item }) => {
  const merchantId = useParams();
  const [items, setItems] = useState([]);
  const [store, setStore] = useState([]);
  const dispatch = useDispatch();

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

  const handleAddToCart = (item) => {
    dispatch(add(item));
  };

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
            <p>In Stock: {item.item_quantity}</p>
            <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
          </ul>
        ))}
        <Link to="/checkout">
          <button>Go to Checkout</button>
        </Link>
      </ul>
    </div>
  );
};

export default SelectedStore;
