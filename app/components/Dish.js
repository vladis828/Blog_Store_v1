import React, { useState } from 'react';
import Slideshow from './Slideshow';

function Dish(props) {
  console.dir(props)
  const [isVisible, setVisible] = useState(false)

  function buttonSwitch(id) {
    if (document.getElementById(id).textContent === 'See More') {
      document.getElementById(id).textContent = 'See Less'
    } else if (document.getElementById(id).textContent === 'See Less') {
      document.getElementById(id).textContent = 'See More'
    }
  }

  return (
    <div id='content'>
      <Slideshow pics={props.pics} />
      <h2>{props.prod.name}</h2>
      <p>{props.prod.description}</p>

      {isVisible ? (
        <div>
          <h2>{props.prod.price}$</h2>
          <form>
            <label>
              Quantity
            </label>
            <input id={`quantity` + props.prod.id} type="number" min={0} max={100} defaultValue={1} />
          </form>
          <p>{props.prod.recipe}</p>
          <button onClick={() => alert(`Product id => ${props.prod.id}, Quantity => ${document.getElementById(`quantity${props.prod.id}`).value}`)}>Add to cart</button>
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
