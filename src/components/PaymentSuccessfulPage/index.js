import {Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const PaymentSuccessfulPage = () => (
  <div className="payment-successful-main">
    <Header />
    <div className="payment-successful-content-main">
      <div className="success-page-content">
        <img
          src="https://res.cloudinary.com/dusy8b5fn/image/upload/v1686029141/Tick_image_xjs5vc.png"
          alt="Payment-Successful"
          className="payment-successful-image"
        />
        <h1 className="payment-successful-text">Payment Successful</h1>
        <p className="payment-success-description">
          Thank you for ordering Your payment is successfully completed.
        </p>
        <Link to="/">
          <button
            type="button"
            className="payment-success-page-go-to-home-button"
          >
            Go To Home Page
          </button>
        </Link>
      </div>
    </div>
  </div>
)

export default PaymentSuccessfulPage
