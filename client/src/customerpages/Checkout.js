import ShoppingCartItems from "../components/ShoppingCartItems";
import { useSelector } from "react-redux";
import React from "react";
import OrderForm from "../components/OrderForm";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import CustomerNavbar from "../components/CustomerNavbar";

const Checkout = () => {
  const { cart } = useSelector((state) => state);
  const totalAmount = cart.reduce(
    (total, item) => total + item.item_price * item.quantity,
    0
  );

  const navigate = useNavigate();
  const parameters = useParams();

  return (
    <div className="checkout-page">
      <CustomerNavbar />
      <h2>Checkout</h2>
      {cart.map((item) => {
        return <ShoppingCartItems key={item.inventory_id} item={item} />;
      })}
      <p>
        <strong>Total: ${totalAmount.toFixed(2)}</strong>
      </p>
      <OrderForm />
      <button
        onClick={() => {
          navigate(`/selectedstore/${parameters.id}/${parameters.customer_id}`);
        }}
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default Checkout;
