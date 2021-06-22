import React, { useEffect, useState, Component } from 'react';
import Navbar from './Navbar';
import Dish from './Dish';
import axios from 'axios';


function Home() {
  const [prods, setProds] = useState([]);

  useEffect(async () => {
    const res = await axios.get('/api/products');
    setProds(res.data)
  }, [])

  return (
    <div>
      <Navbar />
      <div>
        {prods.map(
          prod => <Dish prod={prod} pics={prod.pics} />
        )}
      </div>
    </div>
  )
}

export default Home;

