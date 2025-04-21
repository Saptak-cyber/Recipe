import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const linkStyle = (path) =>
    `block px-3 py-2 rounded hover:bg-blue-100 ${
      location.pathname === path ? "bg-blue-200 font-semibold" : ""
    }`;

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center sticky top-0 z-50">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold text-blue-600">
        TastyBites 🍽
      </Link>

      {/* Hamburger Menu for Mobile */}
      <button
        className="md:hidden text-blue-600"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Navigation Links */}
      <nav
        className={`${
          menuOpen ? "block" : "hidden"
        } absolute md:static top-full left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none md:flex md:space-x-2`}
      >
        <Link to="/" className={linkStyle("/")} onClick={() => setMenuOpen(false)}>
          Home
        </Link>
        <Link to="/recipes" className={linkStyle("/recipes")} onClick={() => setMenuOpen(false)}>
          Recipes
        </Link>
        <Link to="/categories" className={linkStyle("/categories")} onClick={() => setMenuOpen(false)}>
          Categories
        </Link>
        <Link to="/favourites" className={linkStyle("/favourites")} onClick={() => setMenuOpen(false)}>
          Favorites
        </Link>
      </nav>
    </header>
  );
}

export default Header;