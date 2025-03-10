// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Home from "./Home"; // Page Calorie Counter
import Signup from "./Signup";
import Signin from "./Signin";
import FoodDetails from "./FoodDetails";
import Recipes from "./pages/Recipes";
import CalorieCalculator from "./pages/CalorieCalculator";
import About from "./pages/About";
import "./App.css";

const AppContent = () => {
  const location = useLocation();
  // Masquer le header et la navigation sur la page des détails si besoin
  const hideHeader = location.pathname.startsWith("/details");

  return (
    <>
      {!hideHeader && <Header />}
      {!hideHeader && <Navigation />}
      {/* Ajustez le padding-top en fonction de la hauteur combinée de votre header et navigation */}
      <div style={{ paddingTop: !hideHeader ? "140px" : "0px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/calculator" element={<CalorieCalculator />} />
          <Route path="/about" element={<About />} />
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
