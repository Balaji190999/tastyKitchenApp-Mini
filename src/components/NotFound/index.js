import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-main-container">
    <div className="not-found-content">
      <img
        src="https://res.cloudinary.com/dusy8b5fn/image/upload/v1686042558/Not_Found_ddo1jx.png"
        alt="not found"
        className="not-found-image"
      />
      <h1 className="page-not-found-heading">Page Not Found</h1>
      <p className="not-found-description">
        We are sorry, the page you requested could not be found. Please go back
        to the homepage.
      </p>
      <Link to="/">
        <button type="button" className="not-found-button">
          Home Page
        </button>
      </Link>
    </div>
  </div>
)
export default NotFound
