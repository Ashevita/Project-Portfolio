// Home.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const APP_ID = "9a57c6ca";
const API_KEY = "01a8784c95659b9b595c42f8af095f84";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [foodData, setFoodData] = useState([]);
  const [error, setError] = useState(null);
  const [foodList, setFoodList] = useState([]);

  const navigate = useNavigate();

  // Charger la liste sauvegardée depuis localStorage au montage
  useEffect(() => {
    const savedFoodList = localStorage.getItem("foodList");
    if (savedFoodList) {
      setFoodList(JSON.parse(savedFoodList));
    }
  }, []);

  // Sauvegarder la liste dans localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem("foodList", JSON.stringify(foodList));
  }, [foodList]);

  const handleSearch = async () => {
    try {
      setError(null);
      console.log(`Recherche en cours pour : ${searchTerm}`);
      const response = await axios.post(
        "https://trackapi.nutritionix.com/v2/natural/nutrients",
        { query: searchTerm },
        {
          headers: {
            "x-app-id": APP_ID,
            "x-app-key": API_KEY,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Réponse API complète :", response.data);
      setFoodData(response.data.foods || []);
    } catch (error) {
      console.error("Erreur lors de la récupération des données", error);
      setError("Impossible de récupérer les données. Vérifiez votre connexion et réessayez.");
    }
  };

  useEffect(() => {
    console.log("Données mises à jour :", foodData);
  }, [foodData]);

  // Composant pour afficher la ligne cliquable
  const ClickableRow = ({ id, food }) => {
    return (
      <div
        onClick={() => navigate(`/details/${id}`, { state: { food } })}
        style={{ cursor: "pointer", color: "blue" }}
      >
        Cliquez ici pour voir les détails
      </div>
    );
  };

  const handleRemoveFood = (foodToRemove) => {
    setFoodList(foodList.filter((food) => food.food_name !== foodToRemove.food_name));
  };

  // Fonction pour mettre à jour les grammes d'un aliment ajouté
  const handleUpdateGrams = (index, newGrams) => {
    const updatedFoodList = [...foodList];
    updatedFoodList[index] = {
      ...updatedFoodList[index],
      grams: Number(newGrams)
    };
    setFoodList(updatedFoodList);
  };
// Ajoutez cette fonction dans votre composant Home, avant le return.
const handleCreateMeal = () => {
  if (foodList.length === 0) {
    alert("Veuillez ajouter des aliments à votre repas d'abord.");
    return;
  }
  const mealName = prompt("Entrez le nom de votre repas :");
  if (!mealName) {
    alert("Nom invalide.");
    return;
  }

  // Calcul des totaux nutritionnels du repas
  const totalCalories = foodList.reduce(
    (acc, food) => acc + ((Number(food.nf_calories) || 0) * food.grams / 100),
    0
  );
  const totalProtein = foodList.reduce(
    (acc, food) => acc + ((Number(food.nf_protein) || 0) * food.grams / 100),
    0
  );
  const totalCarbs = foodList.reduce(
    (acc, food) => acc + ((Number(food.nf_total_carbohydrate) || 0) * food.grams / 100),
    0
  );
  const totalFat = foodList.reduce(
    (acc, food) => acc + ((Number(food.nf_total_fat) || 0) * food.grams / 100),
    0
  );

  // Créer un objet repas
  const newMeal = {
    id: Date.now(), // identifiant simple
    name: mealName,
    foods: foodList, // vous pouvez aussi permettre de sélectionner un sous-ensemble
    totalCalories,
    totalProtein,
    totalCarbs,
    totalFat,
  };

  // Récupérer les repas déjà créés depuis le localStorage (ou depuis un contexte global)
  const storedMeals = JSON.parse(localStorage.getItem("customMeals") || "[]");
  storedMeals.push(newMeal);
  localStorage.setItem("customMeals", JSON.stringify(storedMeals));

  alert("Repas créé avec succès !");

  // Optionnel : vider la liste d'aliments après création
  // setFoodList([]);
};

  return (
    <div className="container">
      <header className="banner">
        <h1>🍏 Calorie Counter</h1>
      </header>

      <div className="search-container">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher un aliment..."
            className="search-input"
          />
          <button type="submit" className="search-button">
            🔍 Rechercher
          </button>
        </form>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="results">
        {foodData.length > 0 ? (
          <ul className="food-list">
            {foodData.map((food, index) => (
              <li key={index} className="food-item">
                <img
                  src={food.photo?.thumb || "https://via.placeholder.com/100"}
                  alt={food.food_name}
                  className="food-image"
                />
                <span className="food-name">{food.food_name}</span>

                <div className="food-calories">
                  <p>
                    Calories: {food.nf_calories ?? "Non disponible"} kcal/100g
                  </p>
                </div>

                <div className="food-proteins">
                  <p>
                    Protéines: {food.nf_protein ?? "Non disponible"} g/100g
                  </p>
                </div>

                <ClickableRow id={index} food={food} />

                <button
                  onClick={() => {
                    // Demander à l'utilisateur le nombre de grammes
                    const input = window.prompt("Entrez le nombre de grammes pour cet aliment :", "100");
                    const grams = Number(input);
                    if (!isNaN(grams) && grams > 0) {
                      setFoodList([...foodList, { ...food, grams }]);
                    } else {
                      alert("Veuillez entrer un nombre valide de grammes.");
                    }
                  }}
                  className="add-button"
                >
                  Ajouter à la liste
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-results">Aucun résultat trouvé</p>
        )}
      </div>

      <div>
  <h2>Aliments ajoutés</h2>
  <ul>
    {foodList.map((food, index) => (
      <li key={index} className="food-item">
        <div>
          <strong>{food.food_name}</strong>
          <br />
          Calories (pour {food.grams} g) :{" "}
          {((Number(food.nf_calories) || 0) * food.grams / 100).toFixed(2)} kcal
        </div>
        <button onClick={() => handleRemoveFood(food)} className="remove-button">
          Supprimer
        </button>
      </li>
    ))}
  </ul>
  <p>
    Total des calories :{" "}
    {foodList.reduce(
      (acc, food) =>
        acc + ((Number(food.nf_calories) || 0) * food.grams / 100),
      0
    ).toFixed(2)}{" "}
    kcal
  </p>
  {/* Bouton pour créer un repas */}
  <button onClick={handleCreateMeal} className="create-meal-button">
    Créer un repas
  </button>
</div>
    </div>
  );
};

export default Home;
