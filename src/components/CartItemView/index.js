import {Component} from 'react'
import {BiRupee} from 'react-icons/bi'

import './index.css'

class CartItemView extends Component {
  constructor(props) {
    super(props)
    const {eachItemFood} = this.props
    const {quantity} = eachItemFood
    this.state = {
      newQuantity: quantity,
      currentId: '',
    }
  }

  onDecrement = id => {
    const {newQuantity} = this.state
    if (newQuantity > 0) {
      this.setState(
        prevState => ({
          newQuantity: prevState.newQuantity - 1,
          currentId: id,
        }),
        this.sendUpdatedFoodDetail,
      )
    }
  }

  onIncrement = id => {
    this.setState(
      prevState => ({
        newQuantity: prevState.newQuantity + 1,
        currentId: id,
      }),

      this.sendUpdatedFoodDetail,
    )
  }

  sendUpdatedFoodDetail = () => {
    const {updateLocalData} = this.props
    const {newQuantity, currentId} = this.state
    updateLocalData(newQuantity, currentId)
  }

  render() {
    const {eachItemFood} = this.props
    const {newQuantity} = this.state
    const {cost, imageUrl, name, id} = eachItemFood
    return (
      <li data-testid="cartItem" className="cart-item">
        <img src={imageUrl} alt={name} className="cart-food-image" />

        <div className="cart-image-and-name-desktop-container">
          <img src={imageUrl} alt={name} className="cart-food-image-desktop" />
          <h1 className="cart-item-name-desktop">{name}</h1>
        </div>
        <div className="counter-button-container-desktop">
          <button
            type="button"
            onClick={() => this.onDecrement(id)}
            data-testid="decrement-quantity"
            disabled={newQuantity === 0}
            className="cart-item-button-style"
          >
            -
          </button>
          <div className="cart-item-quantity" data-testid="item-quantity">
            {newQuantity}
          </div>
          <button
            type="button"
            onClick={() => this.onIncrement(id)}
            data-testid="increment-quantity"
            className="cart-item-button-style"
          >
            +
          </button>
        </div>

        <p className="cart-item-cost-desktop">
          <BiRupee className="cart-item-cost-rupee-icon" /> {cost * newQuantity}
          .00
        </p>
        <div className="cart-item-content-container">
          <h1 className="cart-item-name">{name}</h1>
          <div className="counter-button-container">
            <button
              type="button"
              onClick={() => this.onDecrement(id)}
              data-testid="decrement-quantity"
              disabled={newQuantity === 0}
              className="cart-item-button-style"
            >
              -
            </button>
            <div className="cart-item-quantity" data-testid="item-quantity">
              {newQuantity}
            </div>
            <button
              type="button"
              onClick={() => this.onIncrement(id)}
              data-testid="increment-quantity"
              className="cart-item-button-style"
            >
              +
            </button>
          </div>
          <p className="cart-item-cost">
            <BiRupee className="cart-item-cost-rupee-icon" />{' '}
            {cost * newQuantity}
            .00
          </p>
        </div>
      </li>
    )
  }
}

export default CartItemView
