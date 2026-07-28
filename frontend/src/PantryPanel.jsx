import React from "react";
import {
  Sparkles,
  Plus,
  X,
  Minus,
  AlertCircle,
  Leaf,
  BookOpen,
  Loader2,
} from "lucide-react";

const CUISINES = [
  "Any",
  "Italian",
  "Indian",
  "Mexican",
  "Thai",
  "Mediterranean",
  "Chinese",
  "Japanese",
  "French",
  "American",
  "Middle Eastern",
];

const DIETS = [
  "None",
  "Vegetarian",
  "Vegan",
  "Gluten-free",
  "Dairy-free",
  "Keto",
  "Low-carb",
  "Nut-free",
];

const TAG_COLORS = ["saffron", "herb", "margin"];

export default function PantryPanel({
  ingredients,
  ingredientDraft,
  setIngredientDraft,
  addIngredient,
  handleIngredientKeyDown,
  removeIngredient,
  cuisine,
  setCuisine,
  diet,
  setDiet,
  servings,
  adjustServings,
  loading,
  handleGenerate,
  genError,
  history,
  setRecipe,
}) {
  return (
    <section className="pantry-panel">
      <h2 className="panel-title">What's in your kitchen?</h2>

      {/* Ingredient Input */}
      <div className="tag-input-wrap">
        <div className="ingredient-tags">
          {ingredients.map((ing, i) => (
            <span
              key={ing}
              className={`ingredient-tag tag-${
                TAG_COLORS[i % TAG_COLORS.length]
              }`}
            >
              <Leaf size={12} />
              {ing}

              <button
                type="button"
                className="tag-remove"
                onClick={() => removeIngredient(ing)}
              >
                <X size={12} />
              </button>
            </span>
          ))}

          <input
            className="tag-input"
            type="text"
            value={ingredientDraft}
            onChange={(e) => setIngredientDraft(e.target.value)}
            onKeyDown={handleIngredientKeyDown}
            onBlur={addIngredient}
            placeholder={
              ingredients.length
                ? "Add another..."
                : "e.g. Paneer, Onion, Tomato"
            }
          />
        </div>

        <button
          type="button"
          className="btn-add"
          onClick={addIngredient}
        >
          <Plus size={14} />
          Add
        </button>
      </div>

      {/* Controls */}
      <div className="control-grid">
        <label className="field">
          <span className="field-label">Cuisine</span>

          <select
            className="select"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
          >
            {CUISINES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>

        <label className="field">
          <span className="field-label">Dietary Need</span>

          <select
            className="select"
            value={diet}
            onChange={(e) => setDiet(e.target.value)}
          >
            {DIETS.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </label>

        <div className="field">
          <span className="field-label">Servings</span>

          <div className="stepper">
            <button onClick={() => adjustServings(-1)}>
              <Minus size={14} />
            </button>

            <span>{servings}</span>

            <button onClick={() => adjustServings(1)}>
              <Plus size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Error */}
      {genError && (
        <div className="error-banner">
          <AlertCircle size={15} />
          {genError}
        </div>
      )}

      {/* Generate Button */}
      <button
        className="btn-primary generate-btn"
        disabled={ingredients.length === 0 || loading}
        onClick={handleGenerate}
      >
        {loading ? (
          <>
            <Loader2 size={16} className="spin" />
            Simmering ideas...
          </>
        ) : (
          <>
            <Sparkles size={16} />
            Generate Recipe
          </>
        )}
      </button>

      {/* Recipe History */}
      {history.length > 0 && (
        <div className="recipe-box">
          <h3 className="box-title">
            <BookOpen size={14} />
            Recipe Box
          </h3>

          <ul className="box-list">
            {history.map((item) => (
              <li key={item._id}>
                <button onClick={() => setRecipe(item)}>
                  {item.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}