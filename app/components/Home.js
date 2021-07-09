import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Dish from './Dish';
import axios from 'axios';


function Home() {
  // console.log("HOME")
  const [prods, setProds] = useState([]);
  const [type, setType] = useState(null);

  function buttonHadler(event) {
    if (event.target.localName === 'button') {
      setType(event.target.firstChild.innerHTML)
    } else {
      setType(event.target.innerHTML)
    }
  }

  useEffect(() => {
    axios.get('/api/products')
      .then(res => setProds(res.data))
  }, [])

  return (
    <div>
      <Navbar setType={setType} />
      <div id='dishFilter'>
        <button onClick={() => setType(null)}><span>All dishes</span></button>
        <button onClick={buttonHadler}><span>Breakfast</span></button>
        <button onClick={buttonHadler}><span>Main</span></button>
        <button onClick={buttonHadler}><span>Dessert</span></button>
      </div>
      <div>
        {prods.map(
          prod => {
            if (!type) {
              return (<Dish key={prod.id} prod={prod} pics={prod.pics} />)
            }
            else if (prod.type === type) {
              return (<Dish key={prod.id} prod={prod} pics={prod.pics} />)
            }
          }
        )}
      </div>
    </div >
  )
}

export default Home;

