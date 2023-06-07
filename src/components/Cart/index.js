import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'
import CartItemView from '../CartItemView'
import CartSummery from '../CartSummery'
import Footer from '../Footer'
import './index.css'

const getCartListFromLocal = () => {
  const stringifyData = localStorage.getItem('cartFoodItem')
  if (stringifyData === null) {
    return []
  }
  return JSON.parse(stringifyData)
}

class Cart extends Component {
  state = {
    cartList: getCartListFromLocal(),
    totalPrice: 0,
  }

  componentDidMount() {
    this.getTotalPrice()
  }

  getTotalPrice = () => {
    const {cartList} = this.state
    let price = 0
    cartList.forEach(eachItem => {
      price += eachItem.quantity * eachItem.cost
    })
    this.setState({totalPrice: price})
  }

  storeNewData = () => {
    const {cartList} = this.state

    localStorage.setItem('cartFoodItem', JSON.stringify(cartList))
    this.getTotalPrice()
  }

  updateLocalData = (newQuantity, currentId) => {
    this.setState(prevState => {
      const {cartList} = prevState
      const updatedCart = cartList.map(item => {
        if (currentId === item.id) {
          return {
            ...item,
            quantity: newQuantity,
          }
        }
        return item
      })

      return {
        cartList: updatedCart,
      }
    }, this.storeNewData)
  }

  render() {
    const {cartList, totalPrice} = this.state
    return (
      <div className="cart-main-bg">
        <Header />
        {cartList.length === 0 ? (
          <div className="emt-cart-main-container">
            <div className="emt-cart-content">
              <img
                src="https://res.cloudinary.com/dusy8b5fn/image/upload/v1686040059/empty-cart_ljakit.png"
                alt="empty cart"
                className="emt-cart-image"
              />
              <h1 className="emt-cart-no-order-title">No Order Yet!</h1>
              <p className="emt-cart-description">
                Your cart is empty Add something from menu.
              </p>
              <Link to="/">
                <button type="button" className="emt-cart-order-now-button">
                  Order Now
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="cart-content-container">
            <ul className="cart-food-list-container">
              <li className="cart-list-item-title">
                <p className="cart-list-item-title-style">Item</p>
                <p className="cart-list-item-title-style cart-quantity-text">
                  Quantity
                </p>
                <p className="cart-list-item-title-style">Price</p>
              </li>
              {cartList.length >= 0
                ? cartList.map(eachItem => (
                    <CartItemView
                      eachItemFood={eachItem}
                      key={eachItem.id}
                      updateLocalData={this.updateLocalData}
                    />
                  ))
                : null}
            </ul>
            <hr className="cart-hr-line" />
            <CartSummery price={totalPrice} />
          </div>
        )}
        <div className="cart-footer-container">
          <Footer />
        </div>
      </div>
    )
  }
}

export default Cart
