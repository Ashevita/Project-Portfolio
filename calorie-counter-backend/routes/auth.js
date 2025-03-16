// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = '1234'; // Remplacez par une clé sécurisée

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: 'Veuillez fournir un email et un mot de passe.' });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "L'utilisateur n'existe pas." });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Identifiants invalides.' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    // Définir un cookie HTTPOnly
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // true en production avec HTTPS
      sameSite: 'lax',
      maxAge: 3600000 // 1 heure
    });

    res.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erreur serveur' });
  }
});

module.exports = router;
