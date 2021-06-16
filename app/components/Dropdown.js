import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function Dropdown() {

  const [menu, setMenu] = useState(false)

  return (
    <div>
      <div><br />
        <Link onClick={() => setMenu(!menu)} >
          Dishes
        </Link><br /><br />
      </div>
      {menu ?
        (<div id='menu'>
          <Link>Breakfast</Link><br />
          <Link>Main Course</Link><br />
          <Link>Desserts</Link><br />
        </div>)
        :
        (null)
      }
    </div>
  )
}

export default Dropdown;
