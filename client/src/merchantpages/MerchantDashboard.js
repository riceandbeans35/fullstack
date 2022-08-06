import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import MerchantNavbar from "../components/MerchantNavbar";

const MerchantDashboard = () => {
  const [merchantId, setMerchantId] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const MerchantId = id;

    setMerchantId(MerchantId);
  }, [id]);

  return (
    <div>
      <MerchantNavbar />
      <h2>Merchant Dashboard</h2>
      <ul>
        <li>
          <Link to={`/inventory/${merchantId}`}>Inventory</Link>
        </li>
        <li>
          <Link to={`/customerorders/${merchantId}`}>Customer Orders</Link>
        </li>
      </ul>
    </div>
  );
};

export default MerchantDashboard;
