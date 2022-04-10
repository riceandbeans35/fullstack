import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const CustomerLogin = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          navigate(`/storelists/${customerId}`);
          console.log("Login Successful");
        } else {
          console.log("Login failed:", response.data.error);
        }
      })
      .catch((error) => {
        console.log("Error during login:", error);
      });
  };

  return (
    <div>
      <h2>Customer Login</h2>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        onClick={() => {
          sendLoginDataToServer();
        }}
      >
        Login
      </button>
    </div>
  );
};

export default CustomerLogin;
