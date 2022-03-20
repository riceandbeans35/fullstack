import LandingPage from "./pages/LandingPage";
import Inventory from "./merchantpages/Inventory";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<LandingPage />} />
          <Route path="/aboutus" exact element={<AboutUs />} />
          <Route path="/contact" exact element={<Contact />} />
          <Route path="/inventory" exact element={<Inventory />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
