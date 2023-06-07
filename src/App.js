import {Component} from 'react'

import {Switch, Route, Redirect} from 'react-router-dom'

import LoginPage from './components/LoginPage'
import HomePage from './components/HomePage'
import ProtectedRoute from './components/ProtectedRoute'
import Cart from './components/Cart'
import RestaurantDetailItem from './components/RestaurantDetailItem'
import PaymentSuccessfulPage from './components/PaymentSuccessfulPage'
import NotFound from './components/NotFound'

import './App.css'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <ProtectedRoute exact path="/" component={HomePage} />
        <ProtectedRoute
          exact
          path="/restaurant/:id"
          component={RestaurantDetailItem}
        />
        <ProtectedRoute exact path="/cart" component={Cart} />
        <ProtectedRoute
          exact
          path="/payment-successful"
          component={PaymentSuccessfulPage}
        />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="not-found" />
      </Switch>
    )
  }
}

export default App
