// Signin.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signin.css"; // Optionnel : pour vos styles

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Vérification simple
    if (!email || !password) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    try {
      // Envoi de la requête au backend (ajustez l'URL selon votre configuration)
      const response = await axios.post("http://localhost:5000/api/auth/signin", {
        email,
        password,
      });
      console.log("Connexion réussie :", response.data);

      // Stocker le token et les infos utilisateur dans le localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Rediriger vers la page d'accueil (ou tableau de bord)
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la connexion :", error.response?.data || error.message);
      alert("Échec de la connexion. Vérifiez vos identifiants.");
    }
  };

  return (
    <div className="auth-page">
      <h2>Connexion</h2>
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
  );
};

export default Signin;
