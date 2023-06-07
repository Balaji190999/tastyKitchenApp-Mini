import {Component} from 'react'
import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'

import './index.css'

class Footer extends Component {
  render() {
    return (
      <div className="footer-main-container">
        <img
          src="https://res.cloudinary.com/dusy8b5fn/image/upload/v1685013089/Footer_website_logo_arnkdc.png"
          alt="website-footer-logo"
          className="website-footer-logo"
        />
        <h1 className="footer-tasty-kitchen-heading">Tasty Kitchens</h1>
        <p className="footer-description">
          The only thing we are serious about is food. Contact us on
        </p>
        <FaPinterestSquare
          data-testid="pintrest-social-icon"
          className="pintrest-social-icon"
        />
        <FaInstagram
          data-testid="instagram-social-icon"
          className="instagram-social-icon"
        />
        <FaTwitter
          data-testid="twitter-social-icon"
          className="twitter-social-icon"
        />
        <FaFacebookSquare
          data-testid="facebook-social-icon"
          className="facebook-social-icon"
        />
      </div>
    )
  }
}

export default Footer
