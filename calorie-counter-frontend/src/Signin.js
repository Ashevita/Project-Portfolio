// Signup.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css"; // Assurez-vous de créer ce fichier CSS

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification simple
    if (!username || !email || !password) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    // Ici vous pouvez appeler votre backend pour l'inscription
    // Exemple : await axios.post("http://votre-backend/api/auth/signup", { username, email, password });

    alert("Inscription réussie !");
    navigate("/");
  };

  return (
    <div className="auth-page">
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Nom d'utilisateur :</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Votre nom d'utilisateur"
          />
        </div>
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
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default Signup;
