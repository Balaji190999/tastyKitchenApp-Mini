import {withRouter} from 'react-router-dom'
import {BiRupee} from 'react-icons/bi'
import './index.css'

const CartSummery = props => {
  const {price} = props

  const placeOrder = () => {
    const {history} = props
    localStorage.clear()
    history.replace('/payment-successful')
  }

  return (
    <div className="cart-summery-main-container">
      <div className="cart-summery-heading-price-container">
        <h1 className="cart-summery-order-total-heading">Order Total : </h1>
        <h1 className="cart-summery-total-price" data-testid="total-price">
          {' '}
          <BiRupee className="cart-summery-rupee-icon" /> {price}.00
        </h1>
      </div>
      <div className="cart-summery-button-container">
        <button
          type="button"
          className="cart-summery-place-order-button"
          onClick={placeOrder}
        >
          Place Order
        </button>
      </div>
    </div>
  )
}

export default withRouter(CartSummery)
