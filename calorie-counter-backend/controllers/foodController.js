const Food = require('../models/Food');

// Recherche d'aliments
const searchFoods = async (req, res) => {
    try {
        const query = req.query.query;
        const foods = await Food.find({ name: new RegExp(query, 'i') });
        res.json(foods);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

module.exports = { searchFoods };
