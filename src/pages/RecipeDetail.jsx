import React, { useEffect, useState } from "react";
import { useRecipeContext } from "../context/RecipeContext";
import { useParams } from "react-router-dom";

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(null);
  const { favourites, addToFavourites, removeFromFavourites } =
    useRecipeContext();
  const isFavourited = favourites.some((fav) => fav.idMeal === id);

  useEffect(() => {
    const fetchRecipeById = async () => {
      setLoading(true);
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      const data = await res.json();
      setRecipe(data.meals?.[0] || null);
      setLoading(false);
    };

    fetchRecipeById();
  }, [id]);

  const getIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const name = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (name && name.trim() !== "") {
        ingredients.push(`${name} - ${measure}`);
      }
    }
    return ingredients;
  };

  if (loading) return <p className="text-center p-4">Loading recipe...</p>;
  if (!recipe)
    return <p className="text-center p-4 text-red-500">Recipe not found.</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{recipe.strMeal}</h1>
      <p className="text-gray-600 mb-4">
        {recipe.strCategory} | {recipe.strArea}
      </p>

      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full rounded-xl mb-6"
      />

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">🧂 Ingredients:</h2>
        <ul className="list-disc list-inside space-y-1">
          {getIngredients().map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">📖 Instructions:</h2>
        <p className="whitespace-pre-line text-gray-700 leading-relaxed">
          {recipe.strInstructions}
        </p>
      </div>

      <button
        onClick={() =>
          isFavourited
            ? removeFromFavourites(recipe.idMeal)
            : addToFavourites(recipe)
        }
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {isFavourited ? "❤️ Remove from Favourites" : "🤍 Add to Favourites"}
      </button>
    </div>
  );
}

export default RecipeDetail;