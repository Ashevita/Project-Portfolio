// src/pages/UserProfile.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserProfile.css"; // Assurez-vous de créer un fichier CSS pour le style

const UserProfile = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    weight: "",
    height: "",
    age: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fonction pour récupérer les données utilisateur depuis le backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        // Supposons que votre token est stocké dans localStorage pour l'authentification
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserData(response.data);
      } catch (err) {
        setError("Erreur lors du chargement du profil.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setUserData({...userData, [e.target.name]: e.target.value});
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put("http://localhost:5000/api/user/profile", userData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Profil mis à jour !");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la mise à jour du profil.");
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="user-profile">
      <h2>Profil Utilisateur</h2>
      <form>
        <div className="form-row">
          <label>Nom d'utilisateur :</label>
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleChange}
            placeholder="Votre nom d'utilisateur"
          />
        </div>
        <div className="form-row">
          <label>Email :</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            placeholder="Votre email"
          />
        </div>
        <div className="form-row">
          <label>Poids (kg) :</label>
          <input
            type="number"
            name="weight"
            value={userData.weight}
            onChange={handleChange}
            placeholder="Votre poids en kg"
          />
        </div>
        <div className="form-row">
          <label>Taille (cm) :</label>
          <input
            type="number"
            name="height"
            value={userData.height}
            onChange={handleChange}
            placeholder="Votre taille en cm"
          />
        </div>
        <div className="form-row">
          <label>Âge :</label>
          <input
            type="number"
            name="age"
            value={userData.age}
            onChange={handleChange}
            placeholder="Votre âge"
          />
        </div>
        <button type="button" onClick={handleSave}>
          Sauvegarder
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
