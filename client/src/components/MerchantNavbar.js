import React from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/Navbar.css";

const MerchantNavbar = () => {
  const { id, merchant_id } = useParams();

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to={`/merchantdashboard/${id || merchant_id}`}>Dashboard</Link>
        </li>
        <li>
          <Link to={`/inventory/${id || merchant_id}`}>Inventory</Link>
        </li>
        <li>
          <Link to={`/customerorders/${id || merchant_id}`}>
            Customer Orders
          </Link>
        </li>
        <li>
          <Link to={"/"}>Sign Out</Link>
        </li>
      </ul>
    </nav>
  );
};

export default MerchantNavbar;
