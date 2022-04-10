import React from "react";
import MerchantRegistrationForm from "../components/MerchantRegistrationForm";
import MerchantLogin from "../components/MerchantLogin";
import CustomerRegistrationForm from "../components/CustomerRegistrationForm";
import CustomerLogin from "../components/CustomerLogin";
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
          <MerchantRegistrationForm />
          <MerchantLogin />
          <CustomerRegistrationForm />
          <CustomerLogin />
        </div>
      </section>
      <footer>
        <div className="footer-links">
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
