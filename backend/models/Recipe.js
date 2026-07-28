import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    // User who created the recipe
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Recipe title
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // Ingredients
    ingredients: [
      {
        type: String,
        required: true,
      },
    ],

    // Cooking instructions
    instructions: {
      type: String,
      required: true,
    },

    // Cuisine
    cuisine: {
      type: String,
      default: "General",
    },

    // Meal category
    category: {
      type: String,
      enum: [
        "Breakfast",
        "Lunch",
        "Dinner",
        "Snack",
        "Dessert",
        "Drink",
      ],
      default: "Dinner",
    },

    // Cooking time in minutes
    cookingTime: {
      type: Number,
      default: 0,
    },

    // Difficulty
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Easy",
    },

    // AI-generated or user-created
    isAIGenerated: {
      type: Boolean,
      default: false,
    },

    // Optional recipe image
    image: {
      type: String,
      default: "",
    },

    // Users who saved this recipe
    savedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;