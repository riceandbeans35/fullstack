import React from "react";

const ShoppingCartItems = ({ item }) => {
  return (
    <>
      <div>
        <div>
          <div>
            <p>
              {" "}
              <strong> {item.item_name} </strong>
            </p>
            <p>${item.item_price}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingCartItems;
