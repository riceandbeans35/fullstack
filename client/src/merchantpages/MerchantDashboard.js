import React from "react";
import { Link } from "react-router-dom";

const MerchantDashboard = () => {
  return (
    <div>
      <h2>Merchant Dashboard</h2>
      <ul>
        <li>
          <Link to="/merchant/inventory">Inventory</Link>
        </li>
      </ul>
    </div>
  );
};

export default MerchantDashboard;
