// src/components/CustomMeals.js
import React, { useState, useEffect } from "react";

const CustomMeals = () => {
  const [customMeals, setCustomMeals] = useState([]);

  useEffect(() => {
    const storedMeals = JSON.parse(localStorage.getItem("customMeals") || "[]");
    setCustomMeals(storedMeals);
  }, []);

  const handleDeleteMeal = (id) => {
    // Filtrer pour retirer le repas avec l'identifiant correspondant
    const updatedMeals = customMeals.filter((meal) => meal.id !== id);
    setCustomMeals(updatedMeals);
    localStorage.setItem("customMeals", JSON.stringify(updatedMeals));
  };

  if (customMeals.length === 0) {
    return <p>Aucun repas personnalisé créé.</p>;
  }

  return (
    <div>
      <h3>Mes Repas Créés</h3>
      {customMeals.map((meal) => (
        <div
          key={meal.id}
          style={{
            border: "1px solid #aaa",
            borderRadius: "8px",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h4>{meal.name}</h4>
          <p>Total Calories : {meal.totalCalories.toFixed(2)} kcal</p>
          <p>
            Protéines : {meal.totalProtein.toFixed(2)} g, Glucides :{" "}
            {meal.totalCarbs.toFixed(2)} g, Lipides : {meal.totalFat.toFixed(2)} g
          </p>
          <button onClick={() => handleDeleteMeal(meal.id)}>
            Supprimer
          </button>
        </div>
      ))}
    </div>
  );
};

export default CustomMeals;
