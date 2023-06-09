import {Component} from 'react'

import './index.css'

class Counter extends Component {
  state = {
    quantity: 1,
  }

  componentDidMount() {
    this.onUpdateQuantity()
  }

  onDecrement = () => {
    const {quantity} = this.state
    if (quantity > 0) {
      this.setState(
        prevState => ({
          quantity: prevState.quantity - 1,
        }),
        this.onUpdateQuantity,
      )
    }
  }

  onIncrement = () => {
    this.setState(
      prevState => ({
        quantity: prevState.quantity + 1,
      }),
      this.onUpdateQuantity,
    )
  }

  onUpdateQuantity = () => {
    const {updateQuantity} = this.props
    const {quantity} = this.state
    updateQuantity(quantity)
  }

  render() {
    const {quantity} = this.state

    return (
      <div className="counter-button-container">
        <button
          type="button"
          onClick={this.onDecrement}
          disabled={quantity === 0}
          className="counter-button-style"
          data-testid="decrement-count"
        >
          -
        </button>
        <div className="counter-text" data-testid="active-count">
          {quantity}
        </div>
        <button
          type="button"
          onClick={this.onIncrement}
          className="counter-button-style"
          data-testid="increment-count"
        >
          +
        </button>
      </div>
    )
  }
}

export default Counter
