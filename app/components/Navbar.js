import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../public/logo.jpg';

function Navbar() {
  // console.log("NAVBAR")
  const [token, setToken] = useState(localStorage.getItem('token'))

  function logOut() {
    localStorage.clear();
    setToken(null);
  }

  function myFunction() {
    var x = document.getElementById("myNavbar");
    if (x.className === "navbar") {
      x.className += " responsive";
    } else {
      x.className = "navbar";
    }
  }

  return (
    <div>
      <div id='logo'>
        <img src={logo} alt='LOGO' id='logoImage' />
      </div >


      <div className='navbar' id='myNavbar'>
        <Link to='/'>
          <span>Home</span>
        </Link>
        <Link to='/about'>
          <span>About Me</span>
        </Link>
        <Link to='/contacts'>
          <span>Contacts</span>
        </Link>

        {token ?
          <div id='userMenu'>
            <Link to='/account'>
              <span>Account</span>
            </Link>
            <Link to='/cart'>
              <span>Cart</span>
            </Link>
            <Link to='/' onClick={logOut}>
              <span>Log out</span>
            </Link>
          </div>
          : <Link to='/login'>
            <span>Log in</span>
          </Link>}
        <a href={"javascript:void(0);"} className="icon" onClick={myFunction}>
          <i className="fa fa-bars"></i>
        </a>
      </div>

    </div >
  )
}

export default Navbar;
