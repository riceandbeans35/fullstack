import ShoppingCartItems from "../components/ShoppingCartItems";
import { useSelector } from "react-redux";
import React from "react";

const Checkout = () => {
  const { cart } = useSelector((state) => state);

  return (
    <div className="checkout-page">
      <p>Checkout</p>
      {cart.map((item) => {
        return <ShoppingCartItems key={item.inventory_id} item={item} />;
      })}
    </div>
  );
};

export default Checkout;
