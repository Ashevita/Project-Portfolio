// src/components/Navigation.js
import React from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css"; // Pour vos styles

const Navigation = () => {
  return (
    <nav className="navigation">
      <NavLink to="/" end className="nav-link">
        Calorie Counter
      </NavLink>
      <NavLink to="/recipes" className="nav-link">
      📖 Recettes
      </NavLink>
      <NavLink to="/calculator" className="nav-link">
        Calculateur
      </NavLink>
      <NavLink to="/shoppinglist" className="nav-link">
      📋 Liste de course
      </NavLink>
    </nav>
  );
};

export default Navigation;
