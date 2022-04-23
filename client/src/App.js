import LandingPage from "./pages/LandingPage";
import Inventory from "./merchantpages/Inventory";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import StoreList from "./customerpages/StoreList";
import SelectedStore from "./customerpages/SelectedStore";
import MerchantDashboard from "./merchantpages/MerchantDashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<LandingPage />} />
          <Route path="/aboutus" exact element={<AboutUs />} />
          <Route path="/contact" exact element={<Contact />} />
          <Route path="/inventory/:id" exact element={<Inventory />} />
          <Route path="/storelists/:id" exact element={<StoreList />} />
          <Route path="/selectedstore/:id" exact element={<SelectedStore />} />
          <Route
            path="/merchantdashboard/:id"
            exact
            element={<MerchantDashboard />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
