import React, { useState } from "react";
import Axios from "axios";

function CustomerRegistrationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const sendCustomerDataToServer = () => {
    const data = {
      name: name,
      email: email,
      password: password,
    };

    Axios.post("http://localhost:3001/registercustomer", data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h2>Customer Registration</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
      <button
        onClick={() => {
          sendCustomerDataToServer();
        }}
      >
        Register
      </button>
    </div>
  );
}

export default CustomerRegistrationForm;
