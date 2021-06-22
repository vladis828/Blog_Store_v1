import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

function Slideshow(props) {
  console.dir(props.pics)
  return (
    <div>
      <Slide easing="ease">
        {props.pics.map(pic =>
          <div className="each-slide">
            <div style={{ 'backgroundImage': `url(${pic.url})` }}>
            </div>
          </div>
        )}
      </Slide>
    </div>
  )
};

export default Slideshow;
