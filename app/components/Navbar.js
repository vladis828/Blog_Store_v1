import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../public/logo.jpg';

function Navbar() {
  // console.log("NAVBAR")
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [showLeft, setShowLeft] = useState(false)
  const [showRight, setShowRight] = useState(false)

  function logOut() {
    localStorage.clear();
    setToken(null);
  }

  return (
    <div>
      <div id='logo'>
        <img src={logo} alt='LOGO' id='logoImage' />
      </div >

      <div className='navbar'>
        <div className='leftSide' >

          <button onClick={() => {
            if (showRight) {
              setShowRight(false)
            }
            setShowLeft(!showLeft)
          }}>Open</button>

          <div className='links' id={showLeft ? 'left' : ''}>
            <Link to='/'>
              <span>Home</span>
            </Link>
            <Link to='/about'>
              <span>About</span>
            </Link>
            <Link to='/contacts'>
              <span>Contacts</span>
            </Link>
          </div>
        </div>
        {token ?
          <div className='rightSide'>
            <button onClick={() => {
              if (showLeft) {
                setShowLeft(false)
              }
              setShowRight(!showRight)
            }}>Open</button>
            <div className='links' id={showRight ? 'right' : ''}>
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


          </div>
          :
          <div className='login'>
            <Link to='/login'>
              <span>Log in</span>
            </Link>
          </div>}

      </div>
    </div >
  )
}

export default Navbar;
