import React from "react";
import LandingPageNavbar from "../components/LandingPageNavbar";
import "../styles/LandingPage.css";

const ContactPage = () => {
  return (
    <div>
      <LandingPageNavbar />
      <div className="login-registration-box">
        <h1>Contact Us</h1>
        <p>
          If you have any questions or inquiries, please feel free to reach out
          to us:
        </p>

        <div>
          <p>Email: contact@atlas.com</p>
          <p>Phone: +1 (555) 374-8532</p>
          <p>Address: 123 Atlas Street, Atlas, USA</p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
