import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import CustomerNavbar from "../components/CustomerNavbar";

const SelectedStore = ({ item }) => {
  const parameters = useParams();
  const [items, setItems] = useState([]);
  const [store, setStore] = useState([]);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const navigate = useNavigate();

  const handleReloadPage = () => {
    window.location.reload();
  };

  useEffect(() => {
    Axios.get(`http://localhost:3001/merchantstore/${parameters.id}`)
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });

    Axios.get(`http://localhost:3001/storename/${parameters.id}`)
      .then((response) => {
        setStore(response.data);
      })
      .catch((error) => {
        console.error("Error fetching store data:", error);
      });
  }, [parameters]);

  const handleAddToCart = (item) => {
    dispatch(add(item));
  };

  const handleRemoveFromCart = (item) => {
    dispatch(remove(item));
  };

  return (
    <div className="store-page">
      <CustomerNavbar />
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
        <button
          onClick={() => {
            navigate(`/checkout/${parameters.id}/${parameters.customer_id}`);
          }}
        >
          Checkout
        </button>
        <button
          onClick={() => {
            navigate(`/storelist/${parameters.customer_id}`);
            handleReloadPage();
          }}
        >
          Back to Store List
        </button>
      </ul>
    </div>
  );
};

export default SelectedStore;
