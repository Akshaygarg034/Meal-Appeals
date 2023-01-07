import React from 'react';
import AddRecipe from './AddRecipe';
import Recipe from './Recipe';

function Home(props) {

  return (

    <div className="container my-3 home" style={{position:'absolute', top:'12%'}}>
      <AddRecipe showAlert={props.showAlert}/>
      <Recipe showAlert={props.showAlert} setProgress={props.setProgress} setLogin = {props.setLogin}/>
    </div>
  )
}

export default Home
