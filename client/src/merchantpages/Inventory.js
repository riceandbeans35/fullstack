import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import MerchantNavbar from "../components/MerchantNavbar";
import { io } from "socket.io-client";
import { useSnackbar } from "notistack";
import "../styles/Inventory.css";
import "../styles/Buttons.css";

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [store, setStore] = useState([]);
  const [editableItemId, setEditableItemId] = useState(null);
  const [editedItemName, setEditedItemName] = useState("");
  const [editedItemPrice, setEditedItemPrice] = useState(0);
  const [editedItemQuantity, setEditedItemQuantity] = useState(0);
  const { id } = useParams();

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const socket = io("ws://localhost:3002");

  socket.on("connection", () => {
    console.log("Connected to WebSocket server");
  });

  socket.on("orderNotification", (data) => {
    if (window.location.pathname === `/inventory/${data.merchantId}`) {
      enqueueSnackbar(
        `${data.customerName} placed an order from your store ${data.storeName}`
      );
    }
  });

  const fetchInventoryData = async () => {
    try {
      const response = await Axios.get(`http://localhost:3001/inventory/${id}`);
      setInventory(response.data);
    } catch (error) {
      console.error("Error fetching inventory data:", error);
    }
    Axios.get(`http://localhost:3001/storename/${id}`)
      .then((response) => {
        setStore(response.data);
      })
      .catch((error) => {
        console.error("Error fetching store data:", error);
      });
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
    const updatedItemData = {
      item_name: editedItemName,
      item_price: editedItemPrice,
      item_quantity: editedItemQuantity,
    };

    Axios.put(`http://localhost:3001/inventory/${itemId}`, updatedItemData)
      .then((response) => {
        const updatedInventory = inventory.map((item) =>
          item.inventory_id === itemId ? { ...item, ...updatedItemData } : item
        );
        setInventory(updatedInventory);
        setEditableItemId(null);
      })
      .catch((error) => {
        console.error("Error updating item:", error);
      });
  };

  const handleCancelEdit = () => {
    setEditableItemId(null);
  };

  const handleAddItem = () => {
    const newItem = {
      merchant_id: id,
      item_name: "New Item",
      item_price: 0.0,
      item_quantity: 0,
    };

    Axios.post("http://localhost:3001/inventory", newItem)
      .then((response) => {
        setInventory([...inventory, newItem]);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error adding item:", error);
      });
  };

  const handleRemoveItem = (itemId) => {
    Axios.delete(`http://localhost:3001/inventory/${itemId}`)
      .then((response) => {
        const updatedInventory = inventory.filter(
          (item) => item.inventory_id !== itemId
        );
        setInventory(updatedInventory);
      })
      .catch((error) => {
        console.error("Error removing item:", error);
      });
  };

  return (
    <div>
      <MerchantNavbar />
      {store.map((store) => (
        <ul key={store.id}>
          <h2 className="header">{store.store} - Inventory Management</h2>
        </ul>
      ))}

      <table className="inventory-table">
        <thead>
          <tr>
            <th className="column-header">Item</th>
            <th className="column-header">Price</th>
            <th className="column-header">Quantity</th>
            <th className="column-header">Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item.inventory_id}>
              <td className="table-cell">
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
              <td className="table-cell">
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
              <td className="table-cell">
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
                    <button
                      onClick={() => handleSaveItem(item.inventory_id)}
                      className="button"
                    >
                      Save
                    </button>
                    <button onClick={handleCancelEdit} className="button">
                      Cancel
                    </button>
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
                      className="button"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleRemoveItem(item.inventory_id)}
                      className="button"
                    >
                      Remove
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="center-buttons">
        <button
          onClick={() => {
            navigate(`/merchantdashboard/${id}`);
          }}
          className="bottom-buttons"
        >
          Back to Dashboard
        </button>
        <button onClick={handleAddItem} className="bottom-buttons">
          Add Item
        </button>
      </div>
    </div>
  );
};

export default Inventory;
