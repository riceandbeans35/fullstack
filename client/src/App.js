import React, { useState } from "react";
import RegistrationForm from "./components/RegistrationForm";

function App() {
  const [currentForm, setCurrentForm] = useState("register");

  return (
    <div className="App">
      {currentForm === "register" ? (
        <RegistrationForm />
      ) : (
        <div>Other Content</div>
      )}
    </div>
  );
}

export default App;
