import React, { useState, useEffect } from 'react';
import Slideshow from './Slideshow';
import axios from 'axios';

function Dish(props) {
  const [isVisible, setVisible] = useState(false)
  const [token, setToken] = useState(localStorage.getItem('token'))

  useEffect(async () => {
    const res = await axios.get('/api/user', { headers: { Authorization: localStorage.getItem('token') } })

    if (res.data === 'Token is not valid') {
      setToken(undefined);
      localStorage.clear()
    }

  }, [])

  function buttonSwitch(id) {
    if (document.getElementById(id).textContent === 'See More') {
      document.getElementById(id).textContent = 'See Less'
    } else if (document.getElementById(id).textContent === 'See Less') {
      document.getElementById(id).textContent = 'See More'
    }
  }

  async function addToCart() {
    const body = {
      userId: localStorage.getItem('userId'),
      productId: props.prod.id,
      productName: props.prod.name,
      productPrice: props.prod.price,
      quantity: `${document.getElementById(`quantity${props.prod.id}`).value}`
    }

    await axios.post('/api/bags', body,
      { headers: { Authorization: localStorage.getItem('token') } }
    )
  }

  return (
    <div id='content'>
      <Slideshow pics={props.pics} />
      <h2>{props.prod.name}</h2>
      <p>{props.prod.type}</p>
      <p>{props.prod.description}</p>

      {isVisible ? (
        <div>
          <h2>{props.prod.price}$</h2>
          {token ? <form>
            <label>
              Quantity
            </label>
            <input id={`quantity` + props.prod.id} type="number" min={0} max={100} defaultValue={1} />
          </form> : null}

          <p>{props.prod.recipe}</p>
          {token ?
            <button onClick={addToCart}>Add to cart</button>
            : null}

        </div>
      ) : null}

      <button id={`extend` + props.prod.id} onClick={() => {
        setVisible(!isVisible);
        buttonSwitch(`extend${props.prod.id}`)
      }
      }>See More</button>
    </div >
  )
}

export default Dish;
