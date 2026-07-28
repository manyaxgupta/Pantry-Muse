import Recipe from "../models/Recipe.js";

// Create Recipe
export const createRecipe = async (req, res) => {
  try {
    const {
      title,
      ingredients,
      instructions,
      cuisine,
      category,
      cookingTime,
      difficulty,
      image,
      isAIGenerated,
    } = req.body;

    const recipe = await Recipe.create({
      user: req.user._id,
      title,
      ingredients,
      instructions,
      cuisine,
      category,
      cookingTime,
      difficulty,
      image,
      isAIGenerated,
    });

    res.status(201).json({
      success: true,
      message: "Recipe created successfully",
      recipe,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: recipes.length,
      recipes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found",
      });
    }

    res.status(200).json({
      success: true,
      recipe,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
