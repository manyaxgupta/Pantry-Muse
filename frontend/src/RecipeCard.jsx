import React from "react";
import { Clock, Users, ChefHat } from "lucide-react";
import "./RecipeCard.css";

export default function RecipeCard({ recipe }) {
  if (!recipe) return null;

  return (
    <article className="recipe-card">
      <div className="stamp">
        <Clock size={12} />
        <span>{recipe.cookTime}</span>

        <span className="stamp-divider" />

        <Users size={12} />
       <span>{recipe.servings} Servings</span>
      </div>

      <p className="recipe-eyebrow">{recipe.cuisine}</p>

      <h2 className="recipe-title">
        {recipe.title}
      </h2>

      <p className="recipe-desc">
        {recipe.description}
      </p>

      <h3 className="recipe-subhead">
        Ingredients
      </h3>

      <ul className="ingredient-list">
        {recipe.ingredients?.map((ing, index) => (
          <li key={index}>
            <span className="amount">
              {ing.amount}
            </span>

            <span>{ing.item}</span>
          </li>
        ))}
      </ul>

      <h3 className="recipe-subhead">
        Method
      </h3>

      <ol className="steps-list">
        {recipe.steps?.map((step, index) => (
          <li key={index}>
            {step}
          </li>
        ))}
      </ol>

      {recipe.tip && (
        <div className="recipe-tip">
        <ChefHat size={18} />
       <div>
       <strong>Chef's Tip</strong>
       <p>{recipe.tip}</p>
       </div>
      </div>
       )}
      </article>
  );
}