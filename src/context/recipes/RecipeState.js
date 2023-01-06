import { useState } from "react";
import recipeContext from "./recipeContext";

const MYLINK = process.env.REACT_APP_LINK;

const RecipeState = (props) => {
    const [recipes, setRecipes] = useState([]);
    const [recipeDetails, setRecipeDetails] = useState([]);
    const [searchRecipes, setSearchRecipes] = useState([]);

    // Get all Recipes
    const getRecipes = async () => {
        const response = await fetch(`${MYLINK}/api/recipes/fetchallrecipes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json();
        setRecipes(json);
    }
    // Add a Recipe
    const addRecipe = async (title, description, direction) => {
        const response = await fetch(`${MYLINK}/api/recipes/addrecipe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, direction })
        });
        const recipe = await response.json();
        setRecipes(recipes.concat(recipe));
    }

    // Delete a Recipe
    const deleteRecipe = async (id) => {
        await fetch(`${MYLINK}/api/recipes/deleterecipe/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const newRecipes = recipes.filter((recipe) => { return recipe._id !== id });
        setRecipes(newRecipes);
    }
    // Edit a Recipes
    const editRecipe = async (id, title, description, direction) => {
        await fetch(`${MYLINK}/api/recipes/updaterecipe/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, direction })
        });
        let newRecipes = JSON.parse(JSON.stringify(recipes));
        for (let index = 0; index < newRecipes.length; index++) {
            const element = newRecipes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.direction = direction;
                break;
            }

        }
        setRecipes(newRecipes);
    }

    // Get recipe
    const openRecipe = async (id) => {
       const response = await fetch(`${MYLINK}/api/recipes/getrecipe/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const new_recipe_detail = await response.json();
        setRecipeDetails(new_recipe_detail);
    }

    const fetchallsearchrecipes = async (id) => {
        const response = await fetch(`${MYLINK}/api/searchrecipes/fetchallsearchrecipes`, {
             method: 'GET',
             headers: {
                 'Content-Type': 'application/json'
             },
         });
         const new_search_recipe = await response.json();
         setSearchRecipes(new_search_recipe);
     }

    return (
        <recipeContext.Provider value={{recipes, recipeDetails, searchRecipes, addRecipe, deleteRecipe, editRecipe, getRecipes, openRecipe, fetchallsearchrecipes, setRecipes}}>
            {props.children}
        </recipeContext.Provider>
    )
}
export default RecipeState;