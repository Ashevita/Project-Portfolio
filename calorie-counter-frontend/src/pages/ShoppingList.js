// src/pages/ShoppingList.js
import React, { useState, useEffect } from "react";
import "./ShoppingList.css"

const ShoppingList = () => {
  const [shoppingList, setShoppingList] = useState([]);

  // Charger la liste de courses depuis le localStorage au montage
  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem("shoppingList") || "[]");
    setShoppingList(storedList);
  }, []);

  // Fonction pour basculer l'état "purchased" d'un aliment
  const handleTogglePurchased = (index) => {
    const updatedList = [...shoppingList];
    updatedList[index].purchased = !updatedList[index].purchased;
    setShoppingList(updatedList);
    localStorage.setItem("shoppingList", JSON.stringify(updatedList));
  };

  // Fonction pour supprimer un aliment de la liste de courses
  const handleRemoveItem = (index) => {
    const updatedList = shoppingList.filter((_, i) => i !== index);
    setShoppingList(updatedList);
    localStorage.setItem("shoppingList", JSON.stringify(updatedList));
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h2>Liste de course</h2>
      {shoppingList.length === 0 ? (
        <p>Aucun aliment dans la liste de course.</p>
      ) : (
        <ul>
          {shoppingList.map((food, index) => (
            <li
              key={index}
              style={{
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  textDecoration: food.purchased ? "line-through" : "none",
                  flex: 1,
                }}
              >
                {food.food_name}
              </span>
              <button
                onClick={() => handleTogglePurchased(index)}
                style={{ marginLeft: "10px"}}
              >
                {food.purchased ? "Acheté" : "Marquer comme acheté"}
              </button>
              <button
                onClick={() => handleRemoveItem(index)}
                style={{
                  marginLeft: "10px",
                  backgroundColor: "red",
                  color: "White",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShoppingList;
