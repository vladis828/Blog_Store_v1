import React from 'react';

function Slideshow(props) {
  console.log('SLIDESHOW')
  console.dir(props)
  return (
    <div>
      {/* <h1>Slideshow</h1> */}
      <img src={props.pics[0].url}></img>
    </div >
  )
}

export default Slideshow;

