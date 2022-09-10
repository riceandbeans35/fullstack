import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import CustomerNavbar from "../components/CustomerNavbar";
import CustomPagination from "../components/CustomPagination";
import "../styles/SelectedStore.css";
import "../styles/Buttons.css";

const SelectedStore = ({ item }) => {
  const parameters = useParams();
  const [items, setItems] = useState([]);
  const [store, setStore] = useState([]);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handleAddToCart = (item) => {
    const cartItem = cart.find(
      (cartItem) => cartItem.inventory_id === item.inventory_id
    );

    if (!cartItem) {
      if (item.item_quantity > 0) {
        dispatch(add(item));
      } else {
        console.log(`Item is out of stock`);
      }
    } else if (cartItem.quantity < item.item_quantity) {
      dispatch(add(item));
    } else {
      console.log(`Cannot add more ${cartItem.item_name}s`);
    }
  };

  const handleRemoveFromCart = (item) => {
    dispatch(remove(item));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page + 1);
  };

  return (
    <div className="store-page">
      <CustomerNavbar />
      {store.map((store) => (
        <ul key={store.id}>
          <h2>{store.store}</h2>
        </ul>
      ))}
      <div>
        {currentItems.map((item) => (
          <div className="item" key={item.inventory_id}>
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
            <button
              onClick={() => handleAddToCart(item)}
              className="store-button"
            >
              Add to Cart
            </button>
            <button
              onClick={() => handleRemoveFromCart(item)}
              className="store-button"
            >
              Remove From Cart
            </button>
          </div>
        ))}

        <div className="bottom-buttons">
          <button
            onClick={() => {
              navigate(`/storelist/${parameters.customer_id}`);
              handleReloadPage();
            }}
            className="bottom-store-buttons"
          >
            Back to Store List
          </button>
          <button
            onClick={() => {
              navigate(`/checkout/${parameters.id}/${parameters.customer_id}`);
            }}
            className="bottom-store-checkout-button"
          >
            Checkout
          </button>
        </div>

        {totalPages > 1 && (
          <CustomPagination
            pageCount={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default SelectedStore;
