const express = require('express');
const { searchFoods } = require('../controllers/foodController');

const router = express.Router();

// Route de recherche des aliments
router.get('/search', searchFoods);

module.exports = router;
