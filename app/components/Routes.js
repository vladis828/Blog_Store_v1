import React from 'react'
import { Switch, Route } from 'react-router-dom'
import DishPage from './DishPage'
import Home from './Home'
import Cart from './Cart'
import AdminPage from './AdminPage'
import AboutPage from './AboutPage'
import Contacts from './Contacts'


function Routes() {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/dish' component={DishPage} />
      <Route exact path='/cart' component={Cart} />
      <Route exact path='/admin' component={AdminPage} />
      <Route exact path='/about' component={AboutPage} />
      <Route exact path='/contacts' component={Contacts} />
    </Switch>
  )
}

export default Routes;
