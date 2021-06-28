import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';

function Login() {

  async function handleSubmit(event) {
    let email = event.target.email.value;
    let password = event.target.password.value;
    event.preventDefault();
    await axios.post('/api/users/auth', { email, password })
      .then((res) => {
        localStorage.setItem('token', res.data.token)
      })
  }

  return (
    <div>
      <Navbar />
      <div id='login'>
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
  )
}

export default Login;

