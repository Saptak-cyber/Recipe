import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, Search, Heart, ThumbsUp } from "lucide-react";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  // Load favorites from localStorage on initial render
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteRecipes');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
  }, [favorites]);

  const fetchDefaultRecipes = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");
      const data = await res.json();
      setRecipes(data.meals?.slice(0, 8) || []);
      
      // Fetch categories for the filter section
      const catRes = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
      const catData = await catRes.json();
      setCategories(catData.categories?.slice(0, 6) || []);
      
      setLoading(false);
    } catch (err) {
      console.error("Failed to load recipes", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDefaultRecipes();
  }, []);

  // Image rotation effect
  useEffect(() => {
    if (recipes.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % recipes.length);
      }, 2000);
      
      return () => clearInterval(interval);
    }
  }, [recipes.length]);

  // Toggle favorite status
  const toggleFavorite = (recipeId) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(recipeId)) {
        return prevFavorites.filter(id => id !== recipeId);
      } else {
        return [...prevFavorites, recipeId];
      }
    });
  };

  // Check if a recipe is in favorites
  const isFavorite = (recipeId) => {
    return favorites.includes(recipeId);
  };

  // Featured recipes (first 3)
  const featuredRecipes = recipes.slice(0, 3);
  
  // Trending recipes (rest)
  const trendingRecipes = recipes.slice(3);
  
  // Navigate to categories page
  const handleImageClick = () => {
    navigate('/categories');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-orange-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16 px-4 md:px-0">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-6xl font-extrabold">
              Welcome to <span className="text-yellow-300">TastyBites</span> 🍽️
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              Discover mouth-watering recipes from around the world, prepared with love and shared with passion.
            </p>
            
            <div className="flex gap-4 mt-6">
              <Link
                to="/recipes"
                className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition flex items-center gap-2"
              >
                Explore Recipes <ChevronRight size={18} />
              </Link>
              <Link
                to="/categories"
                className="bg-white bg-opacity-20 hover:bg-opacity-30 font-semibold px-6 py-3 rounded-full shadow-lg transition text-black"
              >
                Browse Categories
              </Link>
            </div>
          </div>
          
          <div className="md:w-1/2 relative">
            {recipes.length > 0 && (
              <div className="relative h-64 md:h-96 w-full rounded-2xl overflow-hidden shadow-2xl cursor-pointer" onClick={handleImageClick}>
                {recipes.map((recipe, index) => (
                  <div 
                    key={recipe.idMeal}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                      index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <img
                      src={recipe.strMealThumb}
                      alt={recipe.strMeal}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-2xl font-bold">{recipe.strMeal}</h3>
                      <p className="text-sm opacity-90">{recipe.strArea} Cuisine</p>
                      <p className="text-xs mt-2 text-yellow-300">Click to view categories</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Floating decoration elements */}
            <div className="absolute -top-6 -right-6 h-16 w-16 bg-yellow-400 rounded-full opacity-70 hidden md:block"></div>
            <div className="absolute -bottom-4 -left-4 h-12 w-12 bg-orange-300 rounded-full opacity-70 hidden md:block"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-12 px-4 md:px-6">
        {/* Featured Recipes Section */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Featured Recipes</h2>
            <Link to="/recipes" className="text-orange-600 hover:text-orange-700 font-medium flex items-center">
              View all <ChevronRight size={16} />
            </Link>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredRecipes.map((recipe) => (
                <div 
                  key={recipe.idMeal} 
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
                >
                  <div className="relative cursor-pointer">
                    <img
                      src={recipe.strMealThumb}
                      alt={recipe.strMeal}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-2 text-gray-800">{recipe.strMeal}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {recipe.strInstructions?.substring(0, 100)}...
                    </p>
                    <div className="flex justify-end items-center">
                      <Link
                        to={`/recipe/${recipe.idMeal}`}
                        className="text-orange-600 hover:text-orange-700 font-medium"
                      >
                        View Recipe
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Categories Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Browse Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link 
                // to="/categories" 
                to={`/recipes?category=${category.strCategory}`}
                // navigate(`/recipes?category=${category}`);
                key={category.idCategory}
                className="bg-white rounded-lg p-4 text-center shadow hover:shadow-md transition cursor-pointer group"
              >
                <img
                  src={category.strCategoryThumb}
                  alt={category.strCategory}
                  className="w-16 h-16 mx-auto mb-3 group-hover:scale-110 transition-transform"
                />
                <h3 className="font-medium text-gray-800">{category.strCategory}</h3>
              </Link>
        ))}
          </div>
        </section>

        {/* Image Slider for Trending */}
        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Trending Now</h2>
          
          <div className="relative overflow-hidden rounded-xl">
            <div className="flex space-x-6 animate-scroll px-6 py-4">
              {trendingRecipes.concat(trendingRecipes).map((meal, index) => {
                // Generate a random rating if it doesn't already exist
                if (!meal.rating) {
                  meal.rating = (Math.random() * (4.8 - 2.8) + 2.8).toFixed(1);
                }

                return (
                  <div 
                    key={`${meal.idMeal}-${index}`}
                    className="flex-shrink-0 w-64 group cursor-pointer"
                  >
                    <div className="bg-white rounded-xl overflow-hidden shadow-md group-hover:shadow-lg transition relative">
                      <img
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-medium text-gray-800 truncate">{meal.strMeal}</h3>
                        <div className="flex items-center text-sm text-gray-500 mt-2">
                          <ThumbsUp size={14} className="mr-1" />
                          <span>{meal.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Gradient overlays */}
            <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-yellow-50 to-transparent"></div>
            <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-yellow-50 to-transparent"></div>
          </div>
        </section>
      </div>

      {/* Newsletter Section */}
      <div className="bg-orange-100 py-12 px-4 md:px-0">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Enjoy your Meal 😋</h2>
        </div>
      </div>

      {/* Tailwind Custom Animation */}
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-100% / 2)); }
          }

          .animate-scroll {
            animation: scroll 30s linear infinite;
            width: max-content;
          }

          @media (max-width: 768px) {
            .animate-scroll {
              animation-duration: 40s;
            }
          }
          
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;  
            overflow: hidden;
          }
        `}
      </style>
    </div>
  );
}

export default Home;
