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

  function quantity(id, operation) {
    axios.put(`/api/bags/${operation}`, { id })
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

  function deleteItem(id) {
    axios.delete('/api/bags/delete', { data: { id } })
      .then(res => setBags(bags.filter(bag => bag.id !== res.data)))
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
                <button onClick={() => quantity(bag.id, 'plus')}>+</button>
                <button onClick={() => quantity(bag.id, 'minus')}>-</button>
                <button onClick={() => deleteItem(bag.id)}>Delete</button>
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
