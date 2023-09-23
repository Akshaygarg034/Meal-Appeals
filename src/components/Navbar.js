import React from 'react';
import { Link, useHistory, useLocation } from "react-router-dom";
import Fade from 'react-reveal/Fade';

function Navbar(props) {
  let location = useLocation();
  let history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem('token');
    history.push('/login');
    props.setLogin(false);
  }

  const navStyle = {
    width: '85%',
    position: 'fixed',
    margin: '16px 8.3%',
    borderRadius: '20px',
    padding: '8px 13px',
    fontSize: '19px',
    boxShadow: 'grey 1px 9px 9px 0px',
    zIndex: '10'
  }
  // let search = document.getElementById('searchTxt');
  // search.addEventListener("input", function () {

  //   let inputVal = search.value.toLowerCase();
  //   let noteCards = document.getElementsByClassName('noteCard');
  //   Array.from(noteCards).forEach(function (element) {
  //     let cardTxt = element.getElementsByTagName("p")[0].innerText;
  //     if (cardTxt.includes(inputVal)) {
  //       element.style.display = "block";
  //     }
  //     else {
  //       element.style.display = "none";
  //     }
  //   })
  // })

  return (
    <div>
      <Fade left>
        <nav className="navbar navbar-dark navbar-expand-lg bg-dark" style={navStyle}>
          <div className="container-fluid">
            <Link className="navbar-brand" to="#" style={{ fontWeight: '500' }}>Meal Appeals</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''} ${props.login ? '' : 'hide'}`} aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname === '/searchrecipes' ? 'active' : ''} ${props.login ? '' : 'hide'}`} to="/searchrecipes">Search Recipes</Link>
                </li>
              </ul>
              {!localStorage.getItem('token') ? <form className='d-flex'>
                <Link className="btn btn-danger mx-1" to="/login" role="button">Login</Link>
                <Link className="btn btn-danger mx-1" to="/signup" role="button">SignUp</Link>
              </form> : <button onClick={handleLogout} className='btn btn-danger'> Logout</button>
              }
            </div>
          </div>
        </nav>
      </Fade>
    </div>
  )
}

export default Navbar
