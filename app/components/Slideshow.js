import React from 'react';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

function Slideshow(props) {
  return (
    <div className='slide'>
      <Fade easing="ease" >
        {props.pics.map(pic =>
          <div className="each-slide" key={pic.id}>
            <div style={{ 'backgroundImage': `url(${pic.url})` }}>
            </div>
          </div>
        )}
      </Fade>
    </div>
  )
};

export default Slideshow;
