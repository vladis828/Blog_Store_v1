import axios from 'axios';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Navbar from './Navbar';

function Login() {
  // console.log("LOGIN")
  const [isToken, setIsToken] = useState(localStorage.getItem('token'))

  async function handleSubmit(event) {
    let email = event.target.email.value;
    let password = event.target.password.value;
    event.preventDefault();
    const res = await axios.post('/api/users/auth', { email, password })

    const token = res.data.token;
    localStorage.setItem('token', token)
    setIsToken(token)
  }

  return (
    <div>
      {isToken ?
        <Redirect to='/' />
        :
        <div>
          <Navbar />
          <div id='content'>
            <form onSubmit={handleSubmit}>
              <div>
                <label>
                  <h4>Email</h4>
                </label>
                <input name="email" type="email" />
              </div>
              <div>
                <label>
                  <h4>Password</h4>
                </label>
                <input name="password" type="password" />
              </div>
              <div><br />
                <button type="submit">Login</button>
              </div>
            </form>
          </div>
        </div >
      }
    </div >

  )
}

export default Login;

