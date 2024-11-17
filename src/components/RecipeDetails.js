import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import recipeContext from '../context/recipes/recipeContext';
import Fade from 'react-reveal/Fade';

export default function RecipeDetails(props) {
    const params = useParams();
    const context = useContext(recipeContext);
    const { recipeDetails, openRecipe } = context;

    // eslint-disable-next-line
    useEffect(() => {
        props.setProgress(20)
        openRecipe(params.id);
        props.setProgress(100)
        // eslint-disable-next-line
    }, [])

    return (
        <Fade left>
            <div className='recipeDetails' style={{ paddingTop: '8%' }}>
                <div className="text-center">
                    <h1>{recipeDetails.title}</h1>
                    <img src={recipeDetails.img} className='recipeDetailImage my-4' alt='...' />
                    <h1 className='my-5'>Directions</h1>
                </div>
                <p className='text-center'>{recipeDetails.direction}</p>
            </div>
        </Fade>
    )
}
