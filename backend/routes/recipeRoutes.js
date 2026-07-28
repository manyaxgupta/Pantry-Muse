import express from "express";
import { createRecipe ,  getAllRecipes ,  getRecipeById} from "../controllers/recipeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected Route
router.get("/", getAllRecipes);
  router.get("/:id", getRecipeById);
router.post("/", protect, createRecipe);

export default router;