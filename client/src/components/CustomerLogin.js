import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/LandingPage.css";
import "../styles/Buttons.css";

const CustomerLogin = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const sendLoginDataToServer = () => {
    const data = {
      email: email,
      password: password,
    };

    Axios.post("http://localhost:3001/customerlogin", data)
      .then((response) => {
        if (response.data.success) {
          const customerId = response.data.customer.customer_id;
          navigate(`/storelist/${customerId}`);
          console.log("Login Successful");
        } else {
          console.log("Login failed:", response.data.error);
          setErrorMessage(response.data.error);
        }
      })
      .catch((error) => {
        console.log("Error during login:", error);
      });
  };

  return (
    <div className="login-registration-box">
      <h2>Customer Login</h2>
      <div>
        <div className="form-group">
          <div className="form-description">Email Address: </div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errorMessage && <div className="error">{errorMessage}</div>}
        </div>
        <div className="form-group">
          <div className="form-description">Create Password: </div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errorMessage && <div className="error">{errorMessage}</div>}
        </div>
      </div>
      <button
        onClick={() => {
          sendLoginDataToServer();
        }}
        className="landing-page-button"
      >
        Login
      </button>
    </div>
  );
};

export default CustomerLogin;
