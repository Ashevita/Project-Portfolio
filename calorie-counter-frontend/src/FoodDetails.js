// FoodDetails.js
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const FoodDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { food } = location.state || {};

  if (!food) {
    return (
      <div>
        <p>Aucun détail disponible. Veuillez retourner à la page d'accueil.</p>
        <button onClick={() => navigate("/")}>Retour</button>
      </div>
    );
  }

  return (
    <div className="food-details">
      <h2>{food.food_name}</h2>
      <img
        src={food.photo?.thumb || "https://via.placeholder.com/150"}
        alt={food.food_name}
      />
      <p>
        <strong>Calories :</strong> {food.nf_calories ?? "Non disponible"} kcal
      </p>
      <p>
        <strong>Protéines :</strong> {food.nf_protein ?? "Non disponible"} g
      </p>
      <p>
        <strong>Glucides :</strong> {food.nf_total_carbohydrate ?? "Non disponible"} g
      </p>
      <p>
        <strong>Lipides :</strong> {food.nf_total_fat ?? "Non disponible"} g
      </p>
      {/* Ajoute d'autres informations si nécessaire */}
      <button onClick={() => navigate(-1)}>Retour</button>
    </div>
  );
};

export default FoodDetails;
