import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../redux/cartSlice";

const SelectedStore = ({ item }) => {
  const merchantId = useParams();
  const [items, setItems] = useState([]);
  const [store, setStore] = useState([]);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

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

  const handleRemoveFromCart = (item) => {
    dispatch(remove(item));
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
            <p>
              Added to Cart:{" "}
              {cart
                .filter(
                  (cartItem) => cartItem.inventory_id === item.inventory_id
                )
                .map((cartItem) => cartItem.quantity)}
            </p>
            <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
            <button onClick={() => handleRemoveFromCart(item)}>
              Remove From Cart
            </button>
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
