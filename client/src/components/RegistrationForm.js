import React, { useState } from "react";
import Axios from "axios";

function RegistrationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [store, setStore] = useState("");

  const sendMerchantDataToServer = () => {
    const data = {
      name: name,
      email: email,
      password: password,
      store: store,
    };

    Axios.post("http://localhost:3000/register", data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h2>Merchant Registration</h2>
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
      <input
        type="text"
        placeholder="Store Name"
        value={store}
        onChange={(e) => setStore(e.target.value)}
      />
      <button
        onClick={() => {
          sendMerchantDataToServer();
        }}
      >
        Register
      </button>
    </div>
  );
}

export default RegistrationForm;
