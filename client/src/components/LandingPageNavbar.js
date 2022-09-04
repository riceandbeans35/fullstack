import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const LandingPageNavbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/aboutus"}>About Us</Link>
        </li>
        <li>
          <Link to={"/contact"}>Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default LandingPageNavbar;
