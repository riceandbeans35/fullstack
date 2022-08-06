import React from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/Navbar.css";

const CustomerNavbar = () => {
  const { id, merchant_id, customer_id, order_number } = useParams();

  return (
    <nav className="navbar">
      <ul>
        {window.location.pathname ===
          `/selectedstore/${id || merchant_id}/${customer_id}` && (
          <>
            <li>
              <Link to={`/storelist/${customer_id}`}>Store List</Link>
            </li>
            <li>
              <Link to={`/checkout/${id || merchant_id}/${customer_id}`}>
                Checkout
              </Link>
            </li>
            <li>
              <Link to={"/"}>Sign Out</Link>
            </li>
          </>
        )}

        {window.location.pathname === `/storelist/${id}` && (
          <li>
            <Link to="/">Sign Out</Link>
          </li>
        )}

        {window.location.pathname ===
          `/checkout/${id || merchant_id}/${customer_id}` && (
          <>
            <li>
              <Link to={`/storelist/${customer_id}`}>Store List</Link>
            </li>
            <li>
              <Link to="/">Sign Out</Link>
            </li>
          </>
        )}
        {window.location.pathname ===
          `/orderconfirmation/${customer_id}/${order_number}` && (
          <>
            <li>
              <Link to={`/storelist/${customer_id}`}>Store List</Link>
            </li>
            <li>
              <Link to="/">Sign Out</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default CustomerNavbar;
