import React from 'react'
import RecipeList from '../components/RecipeList'
import { useRecipeContext } from '../context/RecipeContext'

function Favourites() {
    const {favourites} = useRecipeContext();

  return (
    <div className='p-4'>
        <h1 className='text-2xl font-bold mb-4'>❤️ Your Favourite Recipes</h1>
        {favourites.length===0 ? (
            <p className='text-gray-500 text-center'>No favourites yet. Go explore some recipes!</p>
        ) : (
            <RecipeList recipes={favourites}/>
        )}
    </div>
  );
}

export default Favourites;