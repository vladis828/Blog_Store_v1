import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import Cart from './Cart'
import AdminPage from './AdminPage'
import AboutPage from './AboutPage'
import Contacts from './Contacts'
import Account from './Account'
import SignUp from './SignUp'


function Routes() {
  // console.log("ROUTES")
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/signup' component={SignUp} />
      <Route exact path='/cart' component={Cart} />
      <Route exact path='/admin' component={AdminPage} />
      <Route exact path='/about' component={AboutPage} />
      <Route exact path='/contacts' component={Contacts} />
      <Route exact path='/account' component={Account} />
    </Switch>
  )
}

export default Routes;
