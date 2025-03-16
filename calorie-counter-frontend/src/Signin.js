// Signin.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signin.css";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Veuillez remplir tous les champs");
      return;
    }
    try {
      // Assurez-vous de configurer axios pour envoyer les cookies
      axios.defaults.withCredentials = true;
      const response = await axios.post("http://localhost:5000/api/auth/signin", { email, password });
      console.log("Connexion réussie :", response.data);
      // Aucune sauvegarde du token ici, le cookie est géré par le navigateur
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la connexion :", error.response?.data || error.message);
      alert("Échec de la connexion. Vérifiez vos identifiants.");
    }
  };

  return (
    <div className="auth-page">
      <h2>Connexion</h2>
      <div className="auth-container">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Email :</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre email"
            />
          </div>
          <div className="form-row">
            <label>Mot de passe :</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Votre mot de passe"
            />
          </div>
          <button type="submit">Se connecter</button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
