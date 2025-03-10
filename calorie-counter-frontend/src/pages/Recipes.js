// src/pages/Recipes.js
import React, { useState } from "react";
import CustomMeals from "../components/CustomMeals";

const recipesData = {
  seche: [
    {
      id: 1,
      title: "Salade de poulet grillé",
      description:
        "Une salade riche en protéines maigres, idéale pour la sèche. Composée de poulet grillé, légumes frais et une vinaigrette légère.",
      calories: 350,
      protein: 30,
      carbs: 15,
      fat: 12,
    },
    {
      id: 2,
      title: "Saumon vapeur aux herbes",
      description:
        "Saumon vapeur accompagné d'herbes fraîches, faible en matières grasses et riche en oméga-3, parfait pour une sèche.",
      calories: 400,
      protein: 35,
      carbs: 5,
      fat: 20,
    },
  ],
  prise: [
    {
      id: 3,
      title: "Bowl de quinoa au poulet et avocat",
      description:
        "Une recette équilibrée pour la prise de masse, riche en glucides complexes, protéines et graisses saines.",
      calories: 600,
      protein: 40,
      carbs: 70,
      fat: 18,
    },
    {
      id: 4,
      title: "Pâtes complètes à la bolognaise",
      description:
        "Des pâtes complètes avec une sauce bolognaise riche en protéines et glucides pour favoriser la prise de masse.",
      calories: 700,
      protein: 35,
      carbs: 90,
      fat: 22,
    },
  ],
  perte: [
    {
      id: 5,
      title: "Smoothie vert détox",
      description:
        "Un smoothie léger et détox, riche en fibres et antioxydants, idéal pour accompagner une perte de poids.",
      calories: 250,
      protein: 10,
      carbs: 35,
      fat: 5,
    },
    {
      id: 6,
      title: "Soupe aux légumes",
      description:
        "Une soupe réconfortante et faible en calories, parfaite pour une diète de perte de poids tout en restant nutritive.",
      calories: 180,
      protein: 8,
      carbs: 25,
      fat: 4,
    },
  ],
};

const Recipes = () => {
  const [category, setCategory] = useState("seche");
  const recipes = recipesData[category];

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h2>Recettes Healthy</h2>
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setCategory("seche")} style={{ marginRight: "10px" }}>
          Sèche
        </button>
        <button onClick={() => setCategory("prise")} style={{ marginRight: "10px" }}>
          Prise de masse
        </button>
        <button onClick={() => setCategory("perte")}>Perte de poids</button>
      </div>

      {/* Afficher les repas personnalisés créés par l'utilisateur */}
      <CustomMeals />

      <hr style={{ margin: "20px 0" }} />

      {recipes && recipes.length > 0 ? (
        recipes.map((recipe) => (
          <div
            key={recipe.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "15px",
            }}
          >
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
            <p>
              <strong>Calories :</strong> {recipe.calories} kcal
            </p>
            <p>
              <strong>Macros :</strong> Protéines : {recipe.protein} g, Glucides : {recipe.carbs} g, Lipides : {recipe.fat} g
            </p>
          </div>
        ))
      ) : (
        <p>Aucune recette trouvée pour cette catégorie.</p>
      )}
    </div>
  );
};

export default Recipes;
