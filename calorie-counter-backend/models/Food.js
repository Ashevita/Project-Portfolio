const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({
    name: String,
    calories: Number,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Food", FoodSchema);
