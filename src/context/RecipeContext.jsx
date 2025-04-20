import { createContext, useContext, useEffect, useState } from "react";

const RecipeContext = createContext();
export const useRecipeContext=() => useContext(RecipeContext);

export const RecipeProvider = ({children}) => {
    const [favourites,setFavourites] = useState([])
    const [isLoaded,setIsLoaded] = useState(false)

    useEffect(()=>{
        try {
            const saved = localStorage.getItem("favourites");
            if(saved){
                const parsed = JSON.parse(saved);
                if(Array.isArray(parsed)){
                    setFavourites(parsed);
                } else {
                    console.warn("Invalid favourites data:",parsed);
                    localStorage.removeItem("favourites");
                }
            }
        } catch(error){
            console.error("Failed to parse favourites from localStorage:",error);
            localStorage.removeItem("favourites")
        } finally {
            setIsLoaded(true)
        }
    },[]);

    useEffect(()=>{
        if(isLoaded){
            localStorage.setItem("favourites",JSON.stringify(favourites))
        }
    },[favourites,isLoaded]);

    const addToFavourites = (recipe)=>{
        if(!favourites.some((fav)=>fav.idMeal===recipe.idMeal)){
            setFavourites([...favourites,recipe])
        }
    };
    const removeFromFavourites=(id)=>{
        setFavourites(favourites.filter((recipe)=>recipe.idMeal!==id));
    }
    return (
        <RecipeContext.Provider value={{favourites,addToFavourites,removeFromFavourites}}>
            {children}
        </RecipeContext.Provider>
    );
};