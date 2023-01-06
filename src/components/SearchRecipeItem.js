import React, { useContext } from 'react';
import recipeContext from '../context/recipes/recipeContext';
import Fade from 'react-reveal/Fade';

function SearchRecipeItem(props) {
    const context = useContext(recipeContext);
    const { recipes, setRecipes } = context;
    const { title, description, imgUrl, direction } = props;

    const addSearchRecipe = async (title, description, direction, img) => {
        const response = await fetch(`${process.env.REACT_APP_LINK}/api/recipes/addrecipe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, direction, img })
        });
        const recipe = await response.json();
        setRecipes(recipes.concat(recipe));
    }

    const handleCLick = (e) => {
        e.preventDefault();
        addSearchRecipe(title, description, direction, imgUrl);
        props.showAlert('Recipe added successfully', 'success');
    }
    return (
        <div className='mx-3 my-2 searchrecipeitem'>
            <Fade left>
                <div className="card" style={{ boxShadow: '1px 5px 7px grey' }}>
                    <div className="card-image">
                        <img src={imgUrl ? imgUrl : 'https://blogs.biomedcentral.com/on-medicine/wp-content/uploads/sites/6/2019/09/iStock-1131794876.t5d482e40.m800.xtDADj9SvTVFjzuNeGuNUUGY4tm5d6UGU5tkKM0s3iPk-620x342.jpg'} className="card-img-top" alt="..." />
                    </div>

                    <div className="card-body">
                        <div className='text-center'>
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{description}</p>
                            <button type='submit' className="btn btn-danger my-2" onClick={handleCLick}>Add Recipe</button>
                        </div>
                    </div>
                </div>
            </Fade>
        </div>
    )
}

export default SearchRecipeItem
