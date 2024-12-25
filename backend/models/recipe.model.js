const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  recipe: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
  },
  creation_date: {
    type: Date,
    default: Date.now,
  },
});

const RecipeModel = mongoose.model("Recipe", recipeSchema);

module.exports = RecipeModel;
