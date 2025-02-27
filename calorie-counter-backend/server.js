require("dotenv").config();
const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const foodRoutes = require('./routes/foodRoutes');

dotenv.config(); // Charger les variables d'environnement

const app = express();
app.use(express.json());
app.use(cors());

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connecté"))
  .catch(err => console.error(err));

// Modèle utilisateur
const UserSchema = new mongoose.Schema({
  email: String,
  password: String
});
const User = mongoose.model("User", UserSchema);

// Route d'inscription
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "Utilisateur créé" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Route de connexion
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Utilisateur non trouvé" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Mot de passe incorrect" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, email: user.email });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

require('dotenv').config();

// Connexion à la base de données
connectDB();

// Middleware pour analyser les corps des requêtes
app.use(express.json());

// Routes
app.use('/api/foods', foodRoutes);

// Lancer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});
