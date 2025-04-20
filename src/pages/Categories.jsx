import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ArrowLeft } from "lucide-react";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryMeals, setCategoryMeals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "https://www.themealdb.com/api/json/v1/1/categories.php"
        );
        const data = await res.json();
        setCategories(data.categories || []);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load categories", err);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const fetchCategoryMeals = async () => {
        try {
          setLoading(true);
          const res = await fetch(
            `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`
          );
          const data = await res.json();
          setCategoryMeals(data.meals || []);
          setLoading(false);
        } catch (err) {
          console.error("Failed to load category meals", err);
          setLoading(false);
        }
      };

      fetchCategoryMeals();
    }
  }, [selectedCategory]);

  // Handler for "Explore Recipes" button
  const handleExploreRecipes = (category) => {
    navigate(`/recipes?category=${category}`);
  };

  // Filter categories based on search term
  const filteredCategories = categories.filter((category) =>
    category.strCategory.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-orange-50 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-6">
            <Link to="/" className="text-white hover:text-yellow-200">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-3xl font-bold ml-4">Food Categories</h1>
          </div>

          {/* Search bar */}
          <div className="relative max-w-xl">
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 pl-12 pr-4 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={18}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-8 px-4">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        ) : selectedCategory ? (
          <div>
            <div className="flex items-center mb-8">
              <button
                onClick={() => setSelectedCategory(null)}
                className="flex items-center text-orange-600 hover:text-orange-700 font-medium"
              >
                <ArrowLeft size={18} className="mr-2" />
                Back to Categories
              </button>
              <h2 className="text-2xl font-bold text-gray-800 ml-4">
                {selectedCategory} Recipes
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categoryMeals.map((meal) => (
                <div
                  key={meal.idMeal}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
                >
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-medium text-gray-800 line-clamp-2">
                      {meal.strMeal}
                    </h3>
                    <Link
                      to={`/recipe/${meal.idMeal}`}
                      className="mt-3 inline-block text-sm text-orange-600 hover:text-orange-700 font-medium"
                    >
                      View Recipe
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              All Categories
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredCategories.map((category) => (
                <div
                  key={category.idCategory}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer"
                >
                  <div className="p-4 flex flex-col items-center text-center">
                    <img
                      src={category.strCategoryThumb}
                      alt={category.strCategory}
                      className="w-24 h-24 object-contain mb-4"
                      onClick={() => setSelectedCategory(category.strCategory)}
                    />
                    <h3 className="font-bold text-lg text-gray-800 mb-2">
                      {category.strCategory}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {category.strCategoryDescription}
                    </p>
                    <button 
                      className="mt-4 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-full transition"
                      onClick={() => handleExploreRecipes(category.strCategory)}
                    >
                      Explore Recipes
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Tailwind Custom Styles */}
      <style>
        {`
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;  
            overflow: hidden;
          }
          
          .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;  
            overflow: hidden;
          }
        `}
      </style>
    </div>
  );
}

export default Categories;