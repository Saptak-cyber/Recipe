# 🍽️ TastyBites - React Recipe App

TastyBites is a modern and responsive recipe application built with React. It allows users to explore recipes, browse categories, search for specific dishes, and save their favorite recipes. The app is powered by [TheMealDB API](https://www.themealdb.com/api.php) and features a clean, user-friendly interface.

---

## 🚀 Live Demo

🔗 [Visit TastyBites on Vercel](https://tasty-bites-umber.vercel.app/)

---

## 🔧 Features

- 🏠 **Home Page**: Explore featured and trending recipes.
- 🔍 **Search Recipes**: Search for recipes by name or keyword.
- 📚 **Browse Categories**: View recipes grouped by categories.
- ❤️ **Favorites**: Save and manage your favorite recipes (stored in localStorage).
- 📖 **Recipe Details**: View detailed instructions and ingredients for each recipe.
- 🥗 **Category Filtering**: Filter recipes by category.
- 📱 **Responsive Design**: Optimized for both desktop and mobile devices.
- ⚡ **Fast Performance**: Built with Vite for lightning-fast development and production builds.

---

## 🛠️ Tech Stack

- **Frontend**: React.js (Functional Components + Hooks)
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Styling**: Tailwind CSS
- **API**: [TheMealDB API](https://www.themealdb.com/api.php)
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Deployment**: Vercel

---

## 📁 Folder Structure

```
src/
├── components/         # Reusable UI components
├── context/            # Context API for global state management
├── pages/              # Page components for routing
├── services/           # API service files
├── App.jsx             # Main application component
├── main.jsx            # Entry point for the React app
├── index.css           # Global styles
```

---

## 🖥️ Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/saptak-cyber/Recipe.git
   cd tastybites
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open the app in your browser:
   ```
   http://localhost:5173
   ```

---

## 📦 Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the app for production.
- `npm run preview`: Preview the production build.
- `npm run lint`: Run ESLint to check for code quality.

---

## 🌟 Features in Detail

### Home Page
- Displays featured and trending recipes.
- Includes a rotating image slider for featured recipes.

### Categories
- Browse recipes by category.
- Search for specific categories using the search bar.

### Recipe Details
- View detailed instructions, ingredients, and images for each recipe.
- Add or remove recipes from your favorites.

### Favorites
- Save your favorite recipes for quick access.
- Favorites are persisted using localStorage.

---

## 🛠️ API Integration

This app uses [TheMealDB API](https://www.themealdb.com/api.php) to fetch recipe data. Key endpoints include:
- `GET /categories.php`: Fetch all recipe categories.
- `GET /filter.php?c={category}`: Fetch recipes by category.
- `GET /lookup.php?i={id}`: Fetch recipe details by ID.
- `GET /search.php?s={query}`: Search for recipes by name.

---

## 🖌️ Styling

The app is styled using **Tailwind CSS**, a utility-first CSS framework. Custom animations and responsive design ensure a seamless user experience across devices.

---

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and submit a pull request.

---

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 📧 Contact

For any questions or feedback, feel free to reach out:
- **GitHub**: [saptak-cyber](https://github.com/saptak-cyber)
