import React from "react";
import { useState } from "react";
import MerchantRegistrationForm from "../components/MerchantRegistrationForm";
import MerchantLogin from "../components/MerchantLogin";
import CustomerRegistrationForm from "../components/CustomerRegistrationForm";
import CustomerLogin from "../components/CustomerLogin";
import LandingPageNavbar from "../components/LandingPageNavbar";
import "../styles/LandingPage.css";
import "../styles/Buttons.css";

const LandingPage = () => {
  const [activeComponent, setActiveComponent] = useState("customerLogin");

  const renderComponent = () => {
    switch (activeComponent) {
      case "customerLogin":
        return <CustomerLogin />;
      case "merchantLogin":
        return <MerchantLogin />;
      case "customerSignUp":
        return <CustomerRegistrationForm />;
      case "merchantSignUp":
        return <MerchantRegistrationForm />;
      default:
        return <CustomerLogin />;
    }
  };

  return (
    <div>
      <LandingPageNavbar />
      <div>
        <div>
          <div className="customer-section">{renderComponent()}</div>
          <div className="customer-section">
            <button
              onClick={() => setActiveComponent("customerLogin")}
              className="bottom-landing-page-buttons"
            >
              Customer Login
            </button>
            <button
              onClick={() => setActiveComponent("merchantLogin")}
              className="bottom-landing-page-buttons"
            >
              Merchant Login
            </button>
            <button
              onClick={() => setActiveComponent("customerSignUp")}
              className="bottom-landing-page-buttons"
            >
              Customer Sign Up
            </button>
            <button
              onClick={() => setActiveComponent("merchantSignUp")}
              className="bottom-landing-page-buttons"
            >
              Merchant Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
