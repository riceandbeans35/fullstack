import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [merchantId, setMerchantId] = useState(null);
  const { id } = useParams();
  const [editableItemId, setEditableItemId] = useState(null);
  const [editedItemName, setEditedItemName] = useState("");
  const [editedItemPrice, setEditedItemPrice] = useState(0);
  const [editedItemQuantity, setEditedItemQuantity] = useState(0);

  const fetchInventoryData = async () => {
    try {
      const response = await Axios.get(`http://localhost:3001/inventory/${id}`);
      setInventory(response.data);
    } catch (error) {
      console.error("Error fetching inventory data:", error);
    }
  };

  useEffect(() => {
    fetchInventoryData();
    console.log(id);
  }, [id]);

  const handleEditItem = (itemId, itemName, itemPrice, itemQuantity) => {
    setEditableItemId(itemId);
    setEditedItemName(itemName);
    setEditedItemPrice(itemPrice);
    setEditedItemQuantity(itemQuantity);
  };

  const handleSaveItem = (itemId) => {
    const updatedInventory = inventory.map((item) =>
      item.inventory_id === itemId
        ? {
            ...item,
            item_name: editedItemName,
            item_price: editedItemPrice,
            item_quantity: editedItemQuantity,
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
    const newItem = {
      merchant_id: merchantId,
      item_name: "New Item",
      item_price: 0.0,
      item_quantity: 0,
    };

    Axios.post("http://localhost:3001/inventory", newItem)
      .then((response) => {
        setInventory([...inventory, newItem]);
      })
      .catch((error) => {
        console.error("Error adding item:", error);
      });
  };

  const handleRemoveItem = (itemId) => {
    const updatedInventory = inventory.filter(
      (item) => item.inventory_id !== itemId
    );
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
            <tr key={item.inventory_id}>
              <td>
                {editableItemId === item.inventory_id ? (
                  <input
                    type="text"
                    value={editedItemName}
                    onChange={(e) => setEditedItemName(e.target.value)}
                  />
                ) : (
                  item.item_name
                )}
              </td>
              <td>
                {editableItemId === item.inventory_id ? (
                  <input
                    type="number"
                    step="0.01"
                    value={editedItemPrice}
                    onChange={(e) => setEditedItemPrice(+e.target.value)}
                  />
                ) : item && typeof item.item_price === "number" ? (
                  `$${item.item_price.toFixed(2)}`
                ) : (
                  ""
                )}
              </td>
              <td>
                {editableItemId === item.inventory_id ? (
                  <input
                    type="number"
                    value={editedItemQuantity}
                    onChange={(e) => setEditedItemQuantity(+e.target.value)}
                  />
                ) : (
                  item.item_quantity
                )}
              </td>
              <td>
                {editableItemId === item.inventory_id ? (
                  <>
                    <button onClick={() => handleSaveItem(item.inventory_id)}>
                      Save
                    </button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() =>
                        handleEditItem(
                          item.inventory_id,
                          item.item_name,
                          item.item_price,
                          item.item_quantity
                        )
                      }
                    >
                      Edit
                    </button>
                    <button onClick={() => handleRemoveItem(item.inventory_id)}>
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
