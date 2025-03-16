// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');

const app = express();

// Middleware CORS
app.use(cors({
  origin: 'http://localhost:3000', // Origine exacte de votre frontend
  credentials: true               // Autoriser l'envoi de cookies
}));

// Middleware pour parser les requêtes JSON et les données URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware cookie-parser (doit être placé AVANT vos routes)
app.use(cookieParser());

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connecté à MongoDB"))
  .catch(err => console.error("Erreur de connexion à MongoDB :", err));

// Déclaration de vos routes
app.use('/api/auth', authRoutes);

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur en écoute sur le port ${PORT}`));
