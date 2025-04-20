import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, ArrowLeft, Filter, X, ChevronDown, Clock, ChevronRight } from "lucide-react";
import { useRecipeContext } from "../context/RecipeContext";

function Recipes() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get("category");

  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "All");
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 8;

  const { favourites, addToFavourites, removeFromFavourites } = useRecipeContext();

  // Fetch all categories for the filter
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "https://www.themealdb.com/api/json/v1/1/categories.php"
        );
        const data = await res.json();
        setCategories(["All", ...(data.categories?.map(cat => cat.strCategory) || [])]);
      } catch (err) {
        console.error("Failed to load categories", err);
      }
    };

    fetchCategories();
  }, []);

  // Fetch recipes based on category or search term
  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        let url;
        if (selectedCategory && selectedCategory !== "All") {
          url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`;
        } else if (searchTerm) {
          url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;
        } else {
          url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
        }

        const res = await fetch(url);
        const data = await res.json();
        setRecipes(data.meals || []);
        setCurrentPage(1);
      } catch (err) {
        console.error("Failed to load recipes", err);
        setRecipes([]);
      }
      setLoading(false);
    };

    fetchRecipes();

    // Update URL params when category changes
    if (selectedCategory && selectedCategory !== "All") {
      navigate(`/recipes?category=${selectedCategory}`);
    } else {
      navigate("/recipes");
    }
  }, [selectedCategory, searchTerm, navigate]);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    // When searching, reset category filter
    if (searchTerm && selectedCategory !== "All") {
      setSelectedCategory("All");
    } else {
      // If not resetting category, force a new fetch
      const fetchRecipes = async () => {
        setLoading(true);
        try {
          const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;
          const res = await fetch(url);
          const data = await res.json();
          setRecipes(data.meals || []);
          setCurrentPage(1);
        } catch (err) {
          console.error("Failed to search recipes", err);
          setRecipes([]);
        }
        setLoading(false);
      };
      
      fetchRecipes();
    }
  };

//   // Pagination
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const totalPages = Math.ceil(recipes.length / recipesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-orange-50 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-6">
            <Link to="/" className="text-white hover:text-yellow-200">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-3xl font-bold ml-4">Recipe Collection</h1>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <form onSubmit={handleSearch} className="flex-grow">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search recipes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-3 pl-12 pr-4 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <Search
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                  size={18}
                />
                <button 
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-green-500 text-white p-1 rounded-full"
                >
                  <Search size={16} />
                </button>
              </div>
            </form>
            
            <div className="relative">
              <button 
                onClick={() => setFilterOpen(!filterOpen)}
                className="flex items-center gap-2 bg-white bg-opacity-20 hover:bg-opacity-30 py-3 px-5 rounded-full"
              >
                <Filter size={18} />
                <span>Filter</span>
                <ChevronDown size={16} />
              </button>
              
              {filterOpen && (
                <div className="absolute top-full mt-2 right-0 w-64 bg-white rounded-lg shadow-lg py-2 z-10">
                  <div className="flex items-center justify-between px-4 py-2 border-b">
                    <h3 className="font-medium">Categories</h3>
                    <button onClick={() => setFilterOpen(false)}>
                      <X size={16} />
                    </button>
                  </div>
                  <div className="max-h-56 overflow-y-auto">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category);
                          setFilterOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-2 hover:bg-orange-50 ${
                          selectedCategory === category ? "bg-orange-100 text-orange-600 font-medium" : ""
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-8 px-4">
        {/* Category Filter Pills */}
        <div className="mb-8">
          <div className="flex gap-2 flex-wrap mb-2">
            {selectedCategory !== "All" && (
              <div className="flex items-center bg-orange-100 text-orange-600 px-3 py-1 rounded-full">
                {selectedCategory}
                <button 
                  onClick={() => setSelectedCategory("All")}
                  className="ml-2 hover:text-orange-800"
                >
                  <X size={14} />
                </button>
              </div>
            )}
            {searchTerm && (
              <div className="flex items-center bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                Search: {searchTerm}
                <button 
                  onClick={() => setSearchTerm("")}
                  className="ml-2 hover:text-blue-800"
                >
                  <X size={14} />
                </button>
              </div>
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            {selectedCategory !== "All" ? `${selectedCategory} Recipes` : "All Recipes"}
            {recipes.length > 0 && <span className="text-gray-500 text-lg font-normal ml-2">({recipes.length})</span>}
          </h2>
        </div>

        {/* Recipe Cards */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        ) : recipes.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {currentRecipes.map((recipe) => {
                const isFavourited = favourites.some((fav) => fav.idMeal === recipe.idMeal);
                return (
                  <div
                    key={recipe.idMeal}
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
                  >
                    <img
                      src={recipe.strMealThumb}
                      alt={recipe.strMeal}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-bold text-lg text-gray-800 line-clamp-2">
                        {recipe.strMeal}
                      </h3>
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <button
                            onClick={() =>
                              isFavourited
                                ? removeFromFavourites(recipe.idMeal)
                                : addToFavourites(recipe)
                            }
                            className="text-sm px-2 py-1 rounded border hover:bg-gray-100"
                          >
                            {isFavourited ? "❤️ Remove" : "🤍 Favourite"}
                          </button>
                        </div>
                        <Link
                          to={`/recipe/${recipe.idMeal}`}
                          className="text-orange-600 hover:text-orange-700 font-medium flex items-center"
                        >
                          View Recipe <ChevronRight size={16} />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <div className="flex gap-2">
                  <button
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`w-10 h-10 flex items-center justify-center rounded-full ${
                      currentPage === 1
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-orange-100 text-orange-600 hover:bg-orange-200"
                    }`}
                  >
                    <ArrowLeft size={16} />
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(num => 
                      num === 1 || 
                      num === totalPages || 
                      (num >= currentPage - 1 && num <= currentPage + 1)
                    )
                    .map((number, index, array) => {
                      // Add ellipsis
                      if (index > 0 && array[index - 1] !== number - 1) {
                        return (
                          <div key={`ellipsis-${number}`} className="flex items-center">
                            <span className="w-10 text-center">...</span>
                            <button
                              key={number}
                              onClick={() => paginate(number)}
                              className={`w-10 h-10 flex items-center justify-center rounded-full ${
                                currentPage === number
                                  ? "bg-orange-500 text-white"
                                  : "bg-orange-100 text-orange-600 hover:bg-orange-200"
                              }`}
                            >
                              {number}
                            </button>
                          </div>
                        );
                      }
                      return (
                        <button
                          key={number}
                          onClick={() => paginate(number)}
                          className={`w-10 h-10 flex items-center justify-center rounded-full ${
                            currentPage === number
                              ? "bg-orange-500 text-white"
                              : "bg-orange-100 text-orange-600 hover:bg-orange-200"
                          }`}
                        >
                          {number}
                        </button>
                      );
                    })}
                  
                  <button
                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className={`w-10 h-10 flex items-center justify-center rounded-full ${
                      currentPage === totalPages
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-orange-100 text-orange-600 hover:bg-orange-200"
                    }`}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="mb-4 text-orange-600">
              <X size={48} className="mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">No recipes found</h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria to find more recipes.
            </p>
            <button 
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
              className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-full transition"
            >
              Clear filters
            </button>
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
        `}
      </style>
    </div>
  );
}

export default Recipes;