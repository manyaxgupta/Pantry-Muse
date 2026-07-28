import client from "../config/openrouter.js";
import Recipe from "../models/Recipe.js";

export const generateRecipe = async (req, res) => {
  try {
    const { ingredients, cuisine, diet, servings } = req.body;

    if (!ingredients || ingredients.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Ingredients are required",
      });
    }

    const prompt = `
Generate a recipe using:

Ingredients: ${ingredients.join(", ")}
Cuisine: ${cuisine || "Any"}
Diet: ${diet || "None"}
Servings: ${servings}

Return ONLY valid JSON.

{
  "title": "",
  "description": "",
  "cookTime": "",
  "difficulty": "",
  "tip": "",
  "ingredients": [
    {
      "item": "",
      "amount": ""
    }
  ],
  "steps": [
    ""
  ]
}
`;

    const completion = await client.chat.completions.create({
      model: "openrouter/free",
      messages: [
        {
          role: "system",
          content:
            "You are a recipe generator. Reply with ONLY valid JSON. Do not use markdown or explanations.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const aiText = completion.choices[0].message.content;

    console.log("AI Response:");
    console.log(aiText);

    // Extract JSON safely
    const start = aiText.indexOf("{");
    const end = aiText.lastIndexOf("}");

    if (start === -1 || end === -1) {
      throw new Error("AI did not return valid JSON.");
    }

    const jsonString = aiText.substring(start, end + 1);

    const aiRecipe = JSON.parse(jsonString);

    const savedRecipe = await Recipe.create({
      user: req.user._id,
      title: aiRecipe.title,
      ingredients: aiRecipe.ingredients.map((i) => i.item),
      instructions: aiRecipe.steps.join("\n"),
      cuisine: cuisine || "AI Generated",
      category: "Dinner",
      cookingTime: Number.parseInt(aiRecipe.cookTime.replace(/\D/g, "")) || 0,
      difficulty: aiRecipe.difficulty,
      isAIGenerated: true,
    });

    res.status(200).json({
      success: true,
      recipe: {
        _id: savedRecipe._id,
        title: aiRecipe.title,
        description: aiRecipe.description,
      cookingTime: Number.parseInt(aiRecipe.cookTime.replace(/\D/g, "")) || 0,
        difficulty: aiRecipe.difficulty,
        servings,
        cuisine: cuisine || "Fusion",
        ingredients: aiRecipe.ingredients,
        steps: aiRecipe.steps,
        tip: aiRecipe.tip,
      },
    });
  } catch (error) {
  console.error("========== AI ERROR ==========");
  console.error(error);

  if (error.response) {
    console.error(error.response.data);
  }

  res.status(500).json({
    success: false,
    message: error.message,
  });
}
};
