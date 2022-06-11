import ShoppingCartItems from "../components/ShoppingCartItems";
import { useSelector } from "react-redux";
import React from "react";
import OrderForm from "../components/OrderForm";

const Checkout = () => {
  const { cart } = useSelector((state) => state);
  const totalAmount = cart.reduce(
    (total, item) => total + item.item_price * item.quantity,
    0
  );

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      {cart.map((item) => {
        return <ShoppingCartItems key={item.inventory_id} item={item} />;
      })}
      <p>
        <strong>Total: ${totalAmount.toFixed(2)}</strong>
      </p>
      <OrderForm />
    </div>
  );
};

export default Checkout;
