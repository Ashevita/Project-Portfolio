// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./Home"; // Page Calorie Counter
import Signup from "./Signup";
import Signin from "./Signin";
import FoodDetails from "./FoodDetails";
import Recipes from "./pages/Recipes";
import CalorieCalculator from "./pages/CalorieCalculator";
import ShoppingList from "./pages/ShoppingList";
import UserProfile from "./pages/UserProfile";  // Nouvelle route pour le profil utilisateur
import "./App.css";

const AppContent = () => {
  const location = useLocation();
  // Masquer le header, la navigation et le footer sur la page des détails si besoin
  const hideHeader = location.pathname.startsWith("/details");

  return (
    <>
      {!hideHeader && <Header />}
      {!hideHeader && <Navigation />}
      {/* On ajoute du padding en haut et en bas pour éviter que le contenu soit masqué */}
      <div style={{ paddingTop: !hideHeader ? "140px" : "0px", paddingBottom: !hideHeader ? "70px" : "0px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/calculator" element={<CalorieCalculator />} />
          <Route path="/shoppinglist" element={<ShoppingList />} />
          <Route path="/profile" element={<UserProfile />} /> {/* Route pour le profil utilisateur */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/details/:id" element={<FoodDetails />} />
        </Routes>
      </div>
      {!hideHeader && <Footer />}
    </>
  );
};

function App() {
  return <AppContent />;
}

export default App;
