import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';
import swal from 'sweetalert';


function Cart() {
  // console.log("CART")

  const [bags, setBags] = useState([])
  const [token, setToken] = useState(localStorage.getItem('token'))

  useEffect(async () => {
    const res = await axios.get('/api/user', { headers: { Authorization: localStorage.getItem('token') } })

    if (res.data === 'Token is not valid') {
      setToken(undefined);
      localStorage.clear()
    } else {
      setBags(res.data.bags)
    }

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

  function placeOrder(ids) {
    axios.put('/api/bags/place', { ids })
      .then(res => {
        setBags(bags.map(bag => {
          if (res.data.includes(bag.id)) {
            return {
              ...bag,
              paid: true
            }
          } else {
            return bag
          }
        }))
      })

    swal({
      title: "Good job!",
      text: "Your order was successfully placed!",
      icon: "success",
    })
  }

  return (
    <div>
      {token ?
        <div>
          <Navbar />
          <div id='cart'>
            <div className='bag'>
              <h3>Your cart</h3>
              {bags.some(bag => !bag.paid) ? bags.map(bag => {
                if (!bag.paid) {
                  return (
                    <div className='bag' key={bag.id}>
                      <h3>Name: {bag.productName}</h3>
                      <p>Price: {bag.productPrice}$</p>
                      <p>Quantity: {bag.quantity}</p>
                      <div className='bagButtons'>
                        <button onClick={() => quantity(bag.id, 'plus')}><span>+</span></button>
                        <button onClick={() => quantity(bag.id, 'minus')}><span>-</span></button>
                        <button onClick={() => deleteItem(bag.id)}><span>Delete</span></button>
                      </div>
                    </div>
                  )
                }
              }

              )
                : <p>Your cart is empty</p>}
            </div>
            {
              bags.some(bag => !bag.paid) ?
                <div id='total'>
                  <h3>Total: {bags.filter(bag => !bag.paid).reduce((acc, curVal) => {
                    return (acc + curVal.productPrice * curVal.quantity)
                  }, 0)}$</h3>
                  <button onClick={() => placeOrder(bags.map(bag => bag.id))}><span>Place order</span></button>
                </div>
                : null
            }
            <div className='history'>
              <h3>Your purchase history</h3>
              {bags.some(bag => bag.paid) ?
                <div>
                  {bags.map(bag => {
                    if (bag.paid) {
                      return (
                        <div id='content' key={bag.id}>
                          <p>Name: {bag.productName}</p>
                          <p>Quantity: {bag.quantity}</p>
                          <p>Date: {bag.updatedAt.slice(0, 10)}</p>
                        </div>
                      )
                    }
                  })}
                </div>
                : <p>No purchase history yet</p>}
            </div>
          </div>
        </div>
        :
        <Redirect to='/login' />
      }

    </div>
  )
}

export default Cart;
