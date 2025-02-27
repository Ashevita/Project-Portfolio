import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Signup from "./Signup";
import { useNavigate } from "react-router-dom"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


const APP_ID = "9a57c6ca"; // Remplace par ton nouvel ID
const API_KEY = "01a8784c95659b9b595c42f8af095f84"; // Remplace par ta nouvelle clé API
const ClickableRow = ({ id }) => {
  const navigate = useNavigate();
  
  return (
    <div onClick={() => navigate(`/details/${id}`)} style={{ cursor: "pointer", color: "blue" }}>
      Cliquez ici pour voir les détails
    </div>
  );
};

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [foodData, setFoodData] = useState([]);
  const [error, setError] = useState(null);
  const [foodList, setFoodList] = useState([]);
  
  const handleAddFood = (food) => {
    setFoodList([...foodList, food]);
  };

  const handleRemoveFood = (foodToRemove) => {
    setFoodList(foodList.filter((food) => food.food_name !== foodToRemove.food_name));
  };

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

  return (
    <Router>
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/details/:id" element={<div>Détails à implémenter</div>} />
    </Routes>
    <><div className='Sinup container'>

    </div>
    <div className="container">
        <header className="banner">
          <h1>🍏 Calorie Counter</h1>
        </header>

        <div className="search-container">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher un aliment..."
            className="search-input" />
          <button onClick={handleSearch} className="search-button">
            🔍 Rechercher
          </button>
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
                    className="food-image" />
                  <span className="food-name">{food.food_name}</span>

                  <div className="food-calories">
                    <p>
                      Calories: {food.nf_calories ?? "Non disponible"} kcal/100g
                    </p>
                  </div>
                  <ClickableRow id={index} />
                  <button onClick={() => handleAddFood(food)} className="add-button">
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
              <li key={index}>
                {food.food_name} - {food.nf_calories ?? "Non disponible"} kcal/100g
                <button onClick={() => handleRemoveFood(food)} className="remove-button">Supprimer</button>
              </li>
            ))}
          </ul>
        </div>
      </div></>
      </Router>
  );
}

export default App;
