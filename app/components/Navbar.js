import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Dropdown from './Dropdown'

function Navbar() {
  // console.log("NAVBAR")
  const [token, setToken] = useState(localStorage.getItem('token'))

  function logOut() {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    setToken(null)
  }

  return (
    <div>
      <div id='logo'>
        < img src='' alt='LOGO' />
      </div >
      <div id='navbar'>
        <Link to='/'>Home</Link>
        <Link to='/about'>About Me</Link>
        <Dropdown />
        <Link to='/contacts'>Contacts</Link>

        {token ?
          <div>
            <Link to='/account'>Account</Link><br />
            <Link to='/cart'>Cart</Link><br />
            <Link onClick={logOut}>Log out</Link>
          </div>
          : <Link to='/login'>Log in</Link>}
      </div>
    </div >
  )
}

export default Navbar;
