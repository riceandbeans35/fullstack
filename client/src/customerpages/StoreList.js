import React, { useState, useEffect } from "react";
import Axios from "axios";

const StoreList = () => {
  const [storeNames, setStoreNames] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/storelist")
      .then((response) => {
        setStoreNames(response.data);
      })
      .catch((error) => {
        console.error("Error fetching store names:", error);
      });
  }, []);

  return (
    <div>
      <h2>List of Stores</h2>
      <ul>
        {storeNames.map((storeName, index) => (
          <li key={index}>{storeName}</li>
        ))}
      </ul>
    </div>
  );
};

export default StoreList;
