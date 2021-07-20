import axios from 'axios';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Navbar from './Navbar';
import swal from 'sweetalert';

function SignUp() {
  // console.log("SIGNUP")
  const [isToken, setIsToken] = useState('')

  async function handleSubmit(event) {
    let email = event.target.email.value;
    let password = event.target.password.value;
    event.preventDefault();
    const res = await axios.post('/api/users/signup', { email, password })

    if (res.data === 'The user with this email already exists') {
      swal({
        title: 'The user already exists',
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
      localStorage.setItem('token', token)
      localStorage.setItem('userId', userId)
      setIsToken(token)
    }
  }

  return (
    <div>
      {isToken ?
        <Redirect to='/' />
        :
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
                <button type="submit"><span>Sign Up</span></button>
              </div>
            </form>
          </div>
        </div >
      }
    </div >

  )
}

export default SignUp;

