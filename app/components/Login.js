import axios from 'axios';
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Navbar from './Navbar';
import swal from 'sweetalert';


function Login() {
  // console.log("LOGIN")
  const [isToken, setIsToken] = useState(localStorage.getItem('token'))

  async function handleSubmit(event) {
    let email = event.target.email.value;
    let password = event.target.password.value;
    event.preventDefault();
    const res = await axios.post('/api/users/auth', { email, password })

    if (res.data === 'The user does not exist') {
      swal({
        title: 'The user does not exist',
        icon: 'error'
      })
    } else if (res.data === 'Invalid credentials') {
      swal({
        title: 'Invalid credentials',
        icon: 'error'
      })
    } else if (res.data === 'Please enter all fields') {
      swal({
        title: 'Please enter all fields',
        icon: 'error'
      })
    } else {
      const token = res.data.token;
      const userId = res.data.user.id
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      setIsToken(token);
    }
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
                <p>No account yet?  <Link to='/signup'>Sign Up! </Link></p>
              </div>
            </form>
          </div>
        </div >
      }
    </div >

  )
}

export default Login;

