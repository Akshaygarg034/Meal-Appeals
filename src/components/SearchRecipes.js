import React, {useEffect, useContext} from 'react';
import recipeContext from '../context/recipes/recipeContext';
import SearchRecipeItem from './SearchRecipeItem';

function SearchRecipes(props) {
    const context = useContext(recipeContext);
    const { fetchallsearchrecipes, searchRecipes } = context;

    useEffect(() => {
        props.setProgress(20);
        fetchallsearchrecipes();
        props.setProgress(100);
        // eslint-disable-next-line
    }, [])
    
    return (
        <div>
            <div className="container">
                <div className='row searchRecipes'>
                    {searchRecipes.map((element) => {
                        return <div key = {element._id} className='col-md-4 my-2'>
                            <SearchRecipeItem showAlert={props.showAlert} title={element.title} description={element.description} imgUrl={element.img} direction = {element.direction}/>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default SearchRecipes
