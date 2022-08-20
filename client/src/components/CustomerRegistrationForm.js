import React, { useState } from "react";
import Axios from "axios";
import "../styles/RegistrationForm.css";

function CustomerRegistrationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});

  const handleValidation = () => {
    const errors = {};
    if (!name) {
      errors.name = "Name cannot be empty";
    }

    if (!email) {
      errors.email = "Email cannot be empty";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Email is not valid";
    }

    if (!password) {
      errors.password = "Password cannot be empty";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };
  const sendCustomerDataToServer = () => {
    if (handleValidation()) {
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
    }
  };

  return (
    <div>
      <h2>Customer Registration</h2>
      <div className="form-container">
        <div className="form-group">
          <div className="form-description">Full Name: </div>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {errors.name && <div className="error">{errors.name}</div>}
        </div>
        <div className="form-group">
          <div className="form-description">Email Address: </div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>
      </div>
      <div className="form-container">
        <div className="form-group">
          <div className="form-description">Create Password: </div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && <div className="error">{errors.password}</div>}
        </div>
      </div>
      <button onClick={sendCustomerDataToServer}>Register</button>
    </div>
  );
}

export default CustomerRegistrationForm;
