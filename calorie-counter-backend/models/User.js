// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  weight:   { type: Number },  // Par exemple, pour stocker le poids
  height:   { type: Number },  // Pour la taille
  age:      { type: Number }   // Pour l'âge
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
