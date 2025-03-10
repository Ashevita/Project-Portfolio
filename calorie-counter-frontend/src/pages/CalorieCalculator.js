// src/pages/CalorieCalculator.js
import React, { useState } from "react";

const CalorieCalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [activity, setActivity] = useState("1.2");
  const [calories, setCalories] = useState(null);

  const calculateCalories = (e) => {
    e.preventDefault();

    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);
    const activityFactor = parseFloat(activity);

    if (!w || !h || !a) {
      alert("Veuillez entrer des valeurs valides pour le poids, la taille et l'âge.");
      return;
    }

    // Calcul du BMR (métabolisme de base) selon la formule de Mifflin-St Jeor
    let bmr;
    if (gender === "male") {
      bmr = 10 * w + 6.25 * h - 5 * a + 5;
    } else {
      bmr = 10 * w + 6.25 * h - 5 * a - 161;
    }

    // Calcul du besoin calorique total en multipliant par le facteur d'activité
    const tdee = bmr * activityFactor;
    setCalories(tdee.toFixed(0));
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
      <h2>Calculateur de calories journalières</h2>
      <form onSubmit={calculateCalories}>
        <div style={{ marginBottom: "10px" }}>
          <label>Poids (kg) : </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Votre poids en kg"
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Taille (cm) : </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Votre taille en cm"
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Âge (ans) : </label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Votre âge"
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Genre : </label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="male">Homme</option>
            <option value="female">Femme</option>
          </select>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Niveau d'activité : </label>
          <select value={activity} onChange={(e) => setActivity(e.target.value)}>
            <option value="1.2">Sédentaire (peu ou pas d'exercice)</option>
            <option value="1.375">Légèrement actif (1-3 jours d'exercice/semaine)</option>
            <option value="1.55">Modérément actif (3-5 jours d'exercice/semaine)</option>
            <option value="1.725">Très actif (6-7 jours d'exercice/semaine)</option>
            <option value="1.9">Extrêmement actif (exercice intense quotidiennement)</option>
          </select>
        </div>
        <button type="submit" style={{ padding: "8px 16px" }}>Calculer</button>
      </form>
      {calories && (
        <div style={{ marginTop: "20px", fontWeight: "bold" }}>
          Votre besoin calorique journalier est d'environ {calories} kcal
        </div>
      )}
    </div>
  );
};

export default CalorieCalculator;
