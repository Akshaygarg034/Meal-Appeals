import React, { useState } from 'react';
import { useContext } from 'react';
import recipeContext from '../context/recipes/recipeContext';
import Fade from 'react-reveal/Fade';

function AddRecipe(props) {
    const context = useContext(recipeContext);
    const { addRecipe } = context;
    const [recipe, setRecipe] = useState({ title: "", description: "", direction: "" })

    const handleCLick = (e) => {
        e.preventDefault();
        addRecipe(recipe.title, recipe.description, recipe.direction);
        setRecipe({ title: "", description: "", direction: "" });
        props.showAlert('Recipe added successfully', 'success');
    }

    const onChange = (e) => {
        setRecipe({ ...recipe, [e.target.name]: e.target.value })
    }
    return (
        <>
            <h2>Add a Recipe</h2>
            <Fade left>
                <form className="my-3">
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={recipe.title} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" aria-describedby="emailHelp" value={recipe.description} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Directions</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name="direction" value={recipe.direction} onChange={onChange}></textarea>
                    </div>

                    <button disabled={recipe.title.length < 3 || recipe.description.length < 5} type="submit" className="btn btn-danger" onClick={handleCLick}>Add Recipe</button>
                </form>
            </Fade>
        </>
    )
}

export default AddRecipe
