import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';

function Cart() {
  // console.log("CART")
  const [bags, setBags] = useState([])
  const token = localStorage.getItem('token')

  useEffect(async () => {
    const res = await axios.get('/api/user', { headers: { Authorization: localStorage.getItem('token') } })
    setBags(res.data.bags)
  }, [])

  console.log(bags)

  return (
    <div>
      {token ?
        <div>
          <Navbar />
          <div>
            {bags.map(bag =>
              <div id='content'>
                <p>Product Name: {bag.productName}</p>
                <p>Product Price: {bag.productPrice}</p>
                <p>Product Quantity: {bag.quantity}</p>
              </div>
            )}
          </div>
        </div>
        :
        <Redirect to='/login' />
      }

    </div>
  )
}

export default Cart;
