import React from "react";
import LandingPageNavbar from "../components/LandingPageNavbar";
import "../styles/LandingPage.css";

const AboutUs = () => {
  return (
    <div>
      <LandingPageNavbar />
      <div className="about-us-section">
        <div className="about-us-box">
          <h1 className="center">About Atlas</h1>
          <p>
            Atlas is your trusted online destination for fresh and quality
            groceries. Our mission is to provide a seamless and convenient
            shopping experience, allowing you to shop for your favorite
            groceries from the comfort of your home.
          </p>
          <p>
            At Atlas, we are committed to delivering only the finest products to
            your doorstep. We partner with local farmers and suppliers to ensure
            that you receive the freshest produce and the best-quality
            groceries.
          </p>
          <p>
            What sets us apart is our dedication to exceptional customer
            service. Our team is here to assist you every step of the way, from
            browsing our extensive product selection to the timely delivery of
            your order.
          </p>
          <p>
            Thank you for choosing Atlas Grocery Store. We look forward to
            serving you and becoming your go-to destination for all your grocery
            needs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
