// src/components/Header.js
import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <h1></h1>
      </div>
      <div className="header__auth">
        <Link to="/signup">
          <button className="signin-button">Sign In</button>
        </Link>
        <Link to="/signin">
          <button className="signup-button">Sign Up</button>
        </Link>

      </div>
    </header>
  );
};

export default Header;
