import { Link, useLocation } from "react-router-dom";
function Header() {
  const location = useLocation();
  const linkStyle = (path) =>
    `px-3 py-2 rounded hover:bg-blue-100 ${
      location.pathname === path ? "bg-blue-200 font-semibold" : ""
    }`;
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="text-xl font-bold text-blue-600">
        TastyBites 🍽
      </Link>
      <nav className="space-x-2">
        <Link to="/" className={linkStyle("/")}>
          Home
        </Link>
        <Link to="/recipes" className={linkStyle("/recipes")}>
          Recipes
        </Link>
        <Link to="/categories" className={linkStyle("/categories")}>
          Categories
        </Link>
        <Link to="/favourites" className={linkStyle("/favourites")}>
          Favorites
        </Link>
      </nav>
    </header>
  );
}
export default Header;