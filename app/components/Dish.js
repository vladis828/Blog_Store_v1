import React from 'react';
import Slideshow from './Slideshow';

function Dish(props) {
  // console.dir(props)
  return (
    <div id='content'>
      <Slideshow pics={props.pics} />
      <h2>{props.prod.name}</h2>
      <p>{props.prod.description}</p>
    </div>
  )
}

export default Dish;
