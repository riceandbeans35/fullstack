import LandingPage from "./pages/LandingPage";
import Inventory from "./merchantpages/Inventory";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import StoreList from "./customerpages/StoreList";
import SelectedStore from "./customerpages/SelectedStore";
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
          <Route path="/storelists" exact element={<StoreList />} />
          <Route path="/selectedstore" exact element={<SelectedStore />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
