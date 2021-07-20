import React, { useState, useEffect } from 'react';
import Slideshow from './Slideshow';
import axios from 'axios';
import swal from 'sweetalert';

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
    if (document.getElementById(id).innerHTML === "<span>See More</span>") {
      document.getElementById(id).innerHTML = "<span>See Less</span>"
    } else if (document.getElementById(id).innerHTML === "<span>See Less</span>") {
      document.getElementById(id).innerHTML = "<span>See More</span>"
    }
  }

  async function addToCart() {
    const body = {
      userId: localStorage.getItem('userId'),
      productId: props.prod.id,
      productName: props.prod.name,
      productPrice: props.prod.price,
      quantity: `${document.getElementById(`quantity${props.prod.id}`).value}`
    };

    swal({
      title: "The item was added to cart!",
      buttons: false,
      timer: 1500,
      icon: 'success',
    });

    await axios.post('/api/bags', body,
      { headers: { Authorization: localStorage.getItem('token') } }
    );


  }

  return (
    <div id='content'>
      <Slideshow pics={props.pics} />
      <div className='contentText'>
        <h2>{props.prod.name}</h2>
        <p>{props.prod.type}</p>
        <h3>About the dish:</h3>
        <p>{props.prod.description}</p>

        {isVisible ? (
          <div className='extendMenu'>
            <h2>{props.prod.price}$</h2>
            {token ? <form>
              <label>
                Quantity:
              </label>
              <input id={`quantity` + props.prod.id} type="number" min={0} max={100} defaultValue={1} />
            </form> : null}

            <h3>Recipe:</h3>
            <p>{props.prod.recipe}</p>
            {token ?
              <button onClick={addToCart}><span>Add to cart</span></button>
              : null}
          </div>
        ) : null}

        <button id={`extend` + props.prod.id} onClick={() => {
          setVisible(!isVisible);
          buttonSwitch(`extend${props.prod.id}`)
        }
        }><span>See More</span></button>
      </div>
    </div >
  )
}

export default Dish;
