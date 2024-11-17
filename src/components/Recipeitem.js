import React from 'react';
import { Link } from "react-router-dom";
import { useContext } from 'react';
import recipeContext from '../context/recipes/recipeContext';
import Fade from 'react-reveal/Fade';

function Recipeitem(props) {
    const context = useContext(recipeContext);
    const { deleteRecipe } = context;
    const { recipe, updateRecipe, id } = props;

    return (
        <Fade left>
            <div className="col-md-3">
                <div className="card my-2 recipeItem" style={{ boxShadow: 'grey 1px 4px 7px' }}>
                    <div className='card-image'>
                        <img src={recipe.img} className="card-img-top" alt='...' />
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{recipe.title}</h5>
                        <p className="card-text">{recipe.description}</p>
                        <div className='steps'>
                            <Link className='text-muted' to={`/recipe/${id}`}>Read more</Link>
                        </div>
                        <div className="icons d-flex justify-content-between">
                            <i className="fa-solid fa-trash-can" onClick={() => {
                                deleteRecipe(recipe._id);
                                props.showAlert("Recipe deleted successfully", "success")
                            }}></i>
                            <i className="fa-solid fa-pen-to-square" onClick={() => { updateRecipe(recipe) }}></i>
                        </div>
                    </div>
                </div>
            </div>
        </Fade>
    )
}

export default Recipeitem
