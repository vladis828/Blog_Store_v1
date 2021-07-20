import axios from 'axios';
import React, { useDebugValue, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Navbar from './Navbar';

function Account() {
  // console.log("ACCOUNT")
  const [user, setUser] = useState({})
  const [token, setToken] = useState(localStorage.getItem('token'))

  useEffect(async () => {
    const res = await axios.get('/api/user', { headers: { Authorization: localStorage.getItem('token') } })

    if (res.data === 'Token is not valid') {
      setToken(undefined);
      localStorage.clear()
    } else {
      setUser(res.data)
    }

  }, [])

  return (
    <div>
      {token ? <div>
        <Navbar />
        <div id='account'>
          <h3>User ID:</h3>
          {user.id}
          <h3>User E-mail:</h3>
          {user.email}
        </div>
      </div>
        :
        <Redirect to='/login' />
      }

    </div>
  )
}

export default Account;

