const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Import des modèles (exemple)
const User = require("./models/User");
const Food = require("./models/Food");

// Middleware d'authentification
const auth = require("./middleware/auth");

// 🔹 ROUTE D'INSCRIPTION
router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Vérifier si l'utilisateur existe déjà
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "Utilisateur déjà existant." });

        // Hasher le mot de passe
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Créer un nouvel utilisateur
        user = new User({ name, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: "Inscription réussie !" });
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur" });
    }
});

// 🔹 ROUTE DE CONNEXION
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: "Utilisateur non trouvé" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Mot de passe incorrect" });

        // Générer un token JWT
        const token = jwt.sign({ userId: user._id }, "SECRET_KEY", { expiresIn: "1h" });
        res.json({ token, user });
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur" });
    }
});

// 🔹 ROUTE MOT DE PASSE OUBLIÉ
router.post("/forgot-password", async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: "Email non trouvé" });

        // Simuler l'envoi d'un email avec un lien de réinitialisation
        res.json({ message: "Un email de réinitialisation a été envoyé." });
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur" });
    }
});

// 🔹 ROUTE POUR RECHERCHER UN ALIMENT
router.get("/food/search", async (req, res) => {
    try {
        const { query } = req.query;
        const results = await Food.find({ name: { $regex: query, $options: "i" } });

        if (results.length === 0) return res.status(404).json({ message: "Aucun aliment trouvé" });

        res.json(results);
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur" });
    }
});

// 🔹 ROUTE POUR AJOUTER UN ALIMENT À LA LISTE PERSONNELLE
router.post("/food/add", auth, async (req, res) => {
    try {
        const { name, calories } = req.body;
        const food = new Food({ name, calories, userId: req.userId });

        await food.save();
        res.json({ message: "Aliment ajouté !" });
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur" });
    }
});

// 🔹 ROUTE POUR SUPPRIMER UN ALIMENT
router.delete("/food/delete/:id", auth, async (req, res) => {
    try {
        await Food.findByIdAndDelete(req.params.id);
        res.json({ message: "Aliment supprimé." });
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur" });
    }
});

// 🔹 ROUTE POUR VOIR L'HISTORIQUE DES ALIMENTS AJOUTÉS
router.get("/food/history", auth, async (req, res) => {
    try {
        const foods = await Food.find({ userId: req.userId });
        res.json(foods);
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur" });
    }
});

module.exports = router;
