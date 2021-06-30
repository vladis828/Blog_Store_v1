import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Navbar from './Navbar';

function Account() {
  const [user, setUser] = useState({})
  const token = localStorage.getItem('token')

  useEffect(async () => {
    const res = await axios.get('/api/user', { headers: { Authorization: localStorage.getItem('token') } })
    setUser(res.data)
  }, [])

  return (
    <div>
      {token ? <div>
        <Navbar />
        <div id='content'>
          <p>User ID: {user.id}</p>
          <p>User E-mail: {user.email}</p>
        </div>
      </div>
        :
        <Redirect to='/login' />
      }

    </div>
  )
}

export default Account;

