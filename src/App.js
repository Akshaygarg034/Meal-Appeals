import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import RecipeState from './context/recipes/RecipeState';
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert';
import { useState, useEffect } from 'react';
import SearchRecipes from './components/SearchRecipes';
import RecipeDetails from './components/RecipeDetails';
import LoadingBar from 'react-top-loading-bar'
import Loader from './components/Loader';

function App() {
  const [loading, setLoading] = useState(true);
  const [login, setLogin] = useState(false);
  const [alert, changeAlert] = useState(null);
  const [progress, setProgress] = useState(0);

  let showAlert = (msg, type) => {
    changeAlert({
      msg: msg,
      type: type
    })

    setTimeout(() => {
      changeAlert(null);
    }, 2000);
  }

  useEffect(() => {
    setInterval(() => {
      setLoading(false);
    }, 3000);
  }, [])

  return (
    <>
      {loading ? <Loader /> :
        <RecipeState>
          <Router>
            <Navbar login = {login} setLogin = {setLogin}/>
            <LoadingBar
              height={2.8}
              color='#f11946'
              progress={progress}
              onLoaderFinished={() => setProgress(0)}
            />
            <Alert alert={alert} />
            <div className="container">
              <Switch>
                <Route exact path="/">
                  <Home showAlert={showAlert} setProgress={setProgress} setLogin = {setLogin}/>
                </Route>
                <Route exact path="/recipe/:id">
                  <RecipeDetails setProgress={setProgress} />
                </Route>
                <Route exact path="/searchrecipes">
                  <SearchRecipes showAlert={showAlert} setProgress={setProgress} />
                </Route>
                <Route exact path="/login">
                  <Login showAlert={showAlert} setProgress={setProgress} setLogin = {setLogin}/>
                </Route>
                <Route exact path="/signup" showAlert={showAlert}>
                  <Signup showAlert={showAlert} setProgress={setProgress} />
                </Route>
              </Switch>
            </div>
          </Router>
        </RecipeState>
      }

    </>
  );
}

export default App;
