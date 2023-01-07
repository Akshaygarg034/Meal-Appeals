import React, { useState, useEffect, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import recipeContext from '../context/recipes/recipeContext';
import Recipeitem from './Recipeitem';

function Recipe(props) {
    const context = useContext(recipeContext);
    const { recipes, getRecipes, editRecipe } = context;
    const [recipe, setRecipe] = useState({ id: "", etitle: "", edescription: "", edirection: "" });
    const history = useHistory();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            props.setLogin(true);
            props.setProgress(20);
            getRecipes();
            props.setProgress(100);
        }
        else {
            history.push('/login');
        }
        // eslint-disable-next-line
    }, [])

    const onChange = (e) => {
        setRecipe({ ...recipe, [e.target.name]: e.target.value })
    }
    const handleCLick = (e) => {
        e.preventDefault();
        editRecipe(recipe.id, recipe.etitle, recipe.edescription, recipe.edirection);
        refClose.current.click();
        props.showAlert("Recipe updated sucecssfully", "success");
    }

    const ref = useRef(null);
    const refClose = useRef(null);

    const updateRecipe = (currentRecipe) => {
        ref.current.click();
        setRecipe({ id: currentRecipe._id, etitle: currentRecipe.title, edescription: currentRecipe.description, edirection: currentRecipe.tag });
    }
    return (
        <>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Recipe</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={recipe.etitle} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" aria-describedby="emailHelp" value={recipe.edescription} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Directions</label>
                                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name="edirection"></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={recipe.etitle.length < 3 || recipe.edescription.length < 5} onClick={handleCLick} type="button" className="btn btn-primary">Update Recipe</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-3'>
                <h2>Your Recipes</h2>
                <div className="container">
                    {recipes.length === 0 && 'No Recipes to display :)'}
                </div>
                {recipes.map((recipe) => {
                    return <Recipeitem key={recipe._id} id={recipe._id} recipe={recipe} updateRecipe={updateRecipe} showAlert={props.showAlert} />;
                })}
            </div>
        </>
    )
}

export default Recipe;
