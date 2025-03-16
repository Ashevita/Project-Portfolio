// src/components/Header.js
import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/">
          <img
            src="/images/logo.png"
            alt="Logo du site"
            className="header__logo-img"
          />
        </Link>
        <h1 className="header__title"></h1>
      </div>
      <nav className="header__nav">
        <ul>
          <li><Link to="/">Accueil</Link></li>
          <li><Link to="/recipes">Recettes</Link></li>
          <li><Link to="/calculator">Calculateur</Link></li>
          <li><Link to="/shoppinglist">Liste de course</Link></li>
        </ul>
      </nav>
      <div className="header__auth">
        <Link to="/signup"><button className="header__btn">Inscription</button></Link>
        <Link to="/signin"><button className="header__btn">Connection</button></Link>
      </div>
    </header>
  );
};

export default Header;
