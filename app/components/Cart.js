import React, { useState } from 'react'
import { Redirect } from 'react-router-dom';
import Navbar from './Navbar';

function Cart() {
  // console.log("CART")
  const token = localStorage.getItem('token')

  return (
    <div>
      {token ?
        <div>
          <Navbar />
          <div>
            Cart
          </div>
        </div>
        :
        <Redirect to='/login' />
      }

    </div>
  )
}

export default Cart;
