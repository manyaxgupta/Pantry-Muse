import React, { useState } from 'react';
import {ChefHat,Loader2} from 'lucide-react';
import "./Dashboard.css";
import RecipeCard from "./RecipeCard";
import PantryPanel from "./PantryPanel";
import Header from "./Header";
import axios from "axios";

export default function Dashboard({ user, onLogout }) {
  // ---- Generator State ----
  const [ingredients, setIngredients] = useState([]);
  const [ingredientDraft, setIngredientDraft] = useState('');
  const [cuisine, setCuisine] = useState('Any');
  const [diet, setDiet] = useState('None');
  const [servings, setServings] = useState(2);
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const [history, setHistory] = useState([]);
  const [genError, setGenError] = useState('');

  function addIngredient() {
    const val = ingredientDraft.trim().replace(/,+$/, '');
    if (!val) return;
    setIngredients(list => (list.some(i => i.toLowerCase() === val.toLowerCase()) ? list : [...list, val]));
    setIngredientDraft('');
  }

  function handleIngredientKeyDown(e) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addIngredient();
    }
  }

  function removeIngredient(val) {
    setIngredients(list => list.filter(i => i !== val));
  }

  function adjustServings(delta) {
    setServings(s => Math.min(8, Math.max(1, s + delta)));
  }
async function handleGenerate() {
  if (ingredients.length === 0 || loading) return;

  setLoading(true);
  setGenError("");

  try {
    const token = localStorage.getItem("token");

    const res = await axios.post(
      "http://localhost:5000/api/ai/generate",
      {
        ingredients,
        cuisine,
        diet,
        servings,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("AI Response:", res.data);

    setRecipe(res.data.recipe);

    setHistory((prev) => [
      res.data.recipe,
      ...prev,
    ].slice(0, 6));

  } catch (error) {
    console.error(error);

    setGenError(
      error.response?.data?.message ||
      "Failed to generate recipe."
    );
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="recipe-app">

      <Header
      user={user}
      onLogout={onLogout}
      />

      <main className="layout-grid">
        {/* Left Side: Inputs */}
        <PantryPanel
        ingredients={ingredients}
        ingredientDraft={ingredientDraft}
        setIngredientDraft={setIngredientDraft}
        addIngredient={addIngredient}
        handleIngredientKeyDown={handleIngredientKeyDown}
        removeIngredient={removeIngredient}
        cuisine={cuisine}
        setCuisine={setCuisine}
        diet={diet}
        setDiet={setDiet}
        servings={servings}
        adjustServings={adjustServings}
        loading={loading}
        handleGenerate={handleGenerate}
        genError={genError}
        history={history}
        setRecipe={setRecipe}
      />

        {/* Right Side: Output Stage */}
        <section className="recipe-stage">
          {!recipe && !loading && (
            <div className="empty-state">
              <ChefHat size={32} strokeWidth={1.5} />
              <p>Add a few ingredients and press generate — your recipe card will land here.</p>
            </div>
          )}

          {loading && (
            <div className="empty-state">
              <Loader2 size={28} className="spin" />
              <p>Working out a recipe for {ingredients.slice(0, 3).join(', ')}{ingredients.length > 3 ? '…' : ''}</p>
            </div>
          )}

          {recipe && !loading && (
            
           <RecipeCard recipe={recipe} />
          )}
        </section>
      </main>
    </div>
  );
}