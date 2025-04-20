import './App.css'
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import Home from "./pages/Home"
import Recipes from "./pages/Recipes"
import RecipeDetail from "./pages/RecipeDetail"
import Favourites from "./pages/Favourites"
import Header from './components/Header'
import Categories from './pages/Categories'

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/recipes" element={<Recipes/>}/>
        <Route path="/recipe/:id" element={<RecipeDetail/>}/>
        <Route path="/categories" element={<Categories/>}/>
        <Route path="/favourites" element={<Favourites/>}/>
      </Routes>
    </Router>
  )
}

export default App
