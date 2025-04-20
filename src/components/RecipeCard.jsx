import { Link } from "react-router-dom";
import { useRecipeContext } from "../context/RecipeContext";
function RecipeCard({ recipe }) {
  const { addToFavourites, favourites, removeFromFavourites } =
    useRecipeContext();
  const isFavourited = favourites.some((fav) => fav.idMeal === recipe.idMeal);
  return (
    <div className="bg-white rounded-xl shadow p-4 max-w-sm w-full flex flex-col">
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="rounded-xl object-cover w-full h-48"
      />
      <h2 className="text-lg font-bold mt-2">{recipe.strMeal}</h2>
      <p className="text-sm text-gray-600">{recipe.strCategory}</p>

      <div className="mt-auto flex justify-between items-center pt-3">
        <Link
          to={`/recipe/${recipe.idMeal}`}
          className="text-blue-500 hover:underline text-sm"
        >
          View Details
        </Link>
        <button
          onClick={() =>
            isFavourited
              ? removeFromFavourites(recipe.idMeal)
              : addToFavourites(recipe)
          }
          className="text-sm px-2 py-1 rounded border hover:bg-gray-100"
        >
          {isFavourited ? "❤️ Remove" : "🤍 Favorite"}
        </button>
      </div>
    </div>
  );
}
export default RecipeCard;