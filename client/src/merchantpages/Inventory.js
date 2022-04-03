import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Inventory = ({ merchantId }) => {
  const initialInventory = [
    {
      id: 1,
      name: "Apple",
      price: 2.99,
      quantity: 50,
    },
    {
      id: 2,
      name: "Orange",
      price: 1.99,
      quantity: 30,
    },
  ];

  const [inventory, setInventory] = useState(initialInventory);
  const [editableItemId, setEditableItemId] = useState(null);
  const [editedItemName, setEditedItemName] = useState("");
  const [editedItemPrice, setEditedItemPrice] = useState(0);
  const [editedItemQuantity, setEditedItemQuantity] = useState(0);

  const handleEditItem = (itemId, itemName, itemPrice, itemQuantity) => {
    setEditableItemId(itemId);
    setEditedItemName(itemName);
    setEditedItemPrice(itemPrice);
    setEditedItemQuantity(itemQuantity);
  };

  const handleSaveItem = (itemId) => {
    const updatedInventory = inventory.map((item) =>
      item.id === itemId
        ? {
            ...item,
            name: editedItemName,
            price: editedItemPrice,
            quantity: editedItemQuantity,
          }
        : item
    );
    setInventory(updatedInventory);
    setEditableItemId(null);
  };

  const handleCancelEdit = () => {
    setEditableItemId(null);
  };

  const handleAddItem = () => {
    // Generate a unique ID for the new item (you can use a library like uuid)
    const newItemId = uuidv4();

    // Create a new item with default values
    const newItem = {
      id: newItemId,
      name: "New Item",
      price: 0.0,
      quantity: 0,
      imageUrl: "default.jpeg", // You can set a default image URL
    };

    // Add the new item to the inventory
    setInventory([...inventory, newItem]);
  };

  const handleRemoveItem = (itemId) => {
    // Filter out the item to be removed
    const updatedInventory = inventory.filter((item) => item.id !== itemId);
    setInventory(updatedInventory);
  };

  return (
    <div className="inventory-page">
      <h1>Inventory Management</h1>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item.id}>
              <td>
                {editableItemId === item.id ? (
                  <input
                    type="text"
                    value={editedItemName}
                    onChange={(e) => setEditedItemName(e.target.value)}
                  />
                ) : (
                  item.name
                )}
              </td>
              <td>
                {editableItemId === item.id ? (
                  <input
                    type="number"
                    step="0.01"
                    value={editedItemPrice}
                    onChange={(e) => setEditedItemPrice(+e.target.value)}
                  />
                ) : (
                  `$${item.price.toFixed(2)}`
                )}
              </td>
              <td>
                {editableItemId === item.id ? (
                  <input
                    type="number"
                    value={editedItemQuantity}
                    onChange={(e) => setEditedItemQuantity(+e.target.value)}
                  />
                ) : (
                  item.quantity
                )}
              </td>
              <td>
                {editableItemId === item.id ? (
                  <>
                    <button onClick={() => handleSaveItem(item.id)}>
                      Save
                    </button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() =>
                        handleEditItem(
                          item.id,
                          item.name,
                          item.price,
                          item.quantity
                        )
                      }
                    >
                      Edit
                    </button>
                    <button onClick={() => handleRemoveItem(item.id)}>
                      Remove
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleAddItem}>Add Item</button>
    </div>
  );
};

export default Inventory;