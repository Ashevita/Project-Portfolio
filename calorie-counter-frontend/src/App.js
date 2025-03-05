// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Home from "./Home";
import Signup from "./Signup";
import Signin from "./Signin";
import FoodDetails from "./FoodDetails";
import "./App.css"
const AppContent = () => {
  const location = useLocation();
  // Masquer le header si le pathname commence par "/details"
  const hideHeader = location.pathname.startsWith("/details");

  return (
    <>
      {!hideHeader && <Header />}
      {/* Ajuster le padding-top en fonction de l'affichage du header */}
      <div style={{ paddingTop: !hideHeader ? "70px" : "0px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/details/:id" element={<FoodDetails />} />
        </Routes>
      </div>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
