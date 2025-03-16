// src/components/Footer.js
import React from "react";
import "./Footer.css"; // Créez ce fichier pour les styles du footer

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Mon Site. Tous droits réservés.</p>
    </footer>
  );
};

export default Footer;
