import React from "react";
import RegistrationForm from "../components/RegistrationForm";
import Login from "../components/Login";
import "../styles/LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Atlas, the E-Commerce platform for grocery stores</h1>
          <p>Your one-stop shop for fresh groceries</p>
        </div>
      </section>
      <section className="features">
        <div className="feature">
          <h2>Quality Products</h2>
          <p>
            Discover a wide range of high-quality groceries carefully selected
            for you.
          </p>
        </div>
        <div className="feature">
          <h2>Exceptional Service</h2>
          <p>
            Our dedicated team is here to provide you with the best shopping
            experience.
          </p>
          <RegistrationForm />
          <Login />
        </div>
      </section>
      <footer>
        <div className="footer-links">
          <a href="/storelists" style={{ marginRight: "10px" }}>
            View Stores
          </a>
          <a href="/aboutus" style={{ marginRight: "10px" }}>
            About Us
          </a>
          <a href="/contact">Contact</a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
