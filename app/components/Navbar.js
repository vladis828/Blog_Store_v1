import React from 'react'
import { Link } from 'react-router-dom'
import Dropdown from './Dropdown'

function Navbar() {
  return (
    <div>
      <div id='logo'>
        <img src='' alt='LOGO' />
      </div>
      <div id='navbar'>
        <Link to='/'>Home</Link>
        <Link to='/about'>About Me</Link>
        <Dropdown />
        <Link to='/contacts'>Contacts</Link>
        <Link to=''>Log in</Link>
      </div>
    </div>
  )
}

export default Navbar;
