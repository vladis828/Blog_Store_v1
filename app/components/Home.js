import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Dish from './Dish';
import axios from 'axios';


function Home() {
  // console.log("HOME")
  const [prods, setProds] = useState([]);
  const [type, setType] = useState(null);

  function buttonHadler(event) {
    setType(event.target.innerText)
  }

  useEffect(() => {
    axios.get('/api/products')
      .then(res => setProds(res.data))
  }, [])

  return (
    <div>
      <Navbar setType={setType} />
      <div id='dishFilter'>
        <button onClick={() => setType(null)}>All dishes</button>
        <button onClick={buttonHadler}>Breakfast</button>
        <button onClick={buttonHadler}>Main</button>
        <button onClick={buttonHadler}>Dessert</button>
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
    </div>
  )
}

export default Home;

