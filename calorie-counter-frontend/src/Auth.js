import React, { useState } from "react";
import axios from "axios";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:5000/register", { email, password });
      setError("");
      alert("Compte créé !");
    } catch (err) {
      setError("Erreur d'inscription");
    }
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setUser(res.data.email);
      setError("");
    } catch (err) {
      setError("Email ou mot de passe incorrect");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <div className="auth-container">
      <h2>{user ? `Bienvenue, ${user}` : "Connexion / Inscription"}</h2>

      {user ? (
        <button onClick={handleLogout} className="logout-button">Déconnexion</button>
      ) : (
        <div className="form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
          <button onClick={handleLogin} className="auth-button">Connexion</button>
          <button onClick={handleRegister} className="auth-button register">Inscription</button>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default Auth;
