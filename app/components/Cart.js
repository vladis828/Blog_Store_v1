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

  function increment(id) {
    axios.put('/api/bags/plus', { id })
      .then(res => {
        setBags(bags.map(bag => {
          if (bag.id === id) {
            return {
              ...bag,
              quantity: res.data
            };
          } else {
            return bag
          }
        }))
      })
  }

  function decrement(id) {
    axios.put('/api/bags/minus', { id })
      .then(res => {
        setBags(bags.map(bag => {
          if (bag.id === id) {
            return {
              ...bag,
              quantity: res.data
            };
          } else {
            return bag
          }
        }))
      })
  }

  function deleteItem() {

  }

  return (
    <div>
      {token ?
        <div>
          <Navbar />
          <div>
            {bags.length ? bags.map(bag =>
              <div id='content'>
                <p>Name: {bag.productName}</p>
                <p>Price: {bag.productPrice}</p>
                <p>Quantity: {bag.quantity}</p>
                <button onClick={() => increment(bag.id)}>+</button>
                <button onClick={() => decrement(bag.id)}>-</button>
                <button onClick={deleteItem}>Delete</button>
              </div>
            )
              : <p>Your cart is empty</p>}
          </div>
        </div>
        :
        <Redirect to='/login' />
      }

    </div>
  )
}

export default Cart;
