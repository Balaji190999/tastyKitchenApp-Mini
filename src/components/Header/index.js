import {withRouter, NavLink, Link} from 'react-router-dom'
import {useState} from 'react'
import {IoIosCloseCircle} from 'react-icons/io'
import {GiHamburgerMenu} from 'react-icons/gi'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const [isActive, setIsActive] = useState(false)
  const onClickHamburgerButton = () => {
    setIsActive(!isActive)
  }

  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <>
      <div className="header-main-container">
        <div className="header-logo-container">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dusy8b5fn/image/upload/v1684392912/Login-icon_ocbvwi.jpg"
              alt="website logo"
              className="header-logo"
            />
          </Link>
          <h1 className="header-tasty-kitchen-title">Tasty Kitchen</h1>
        </div>

        <button
          type="button"
          className="header-hamburger-button"
          onClick={onClickHamburgerButton}
        >
          <GiHamburgerMenu className="header-hamburger-menu" />
        </button>

        <div className="header-lg-button-container">
          <ul className="header-nav-item-container">
            <li className="header-section-item">
              <NavLink
                exact
                to="/"
                activeClassName="active-link"
                className="in-active-link"
              >
                Home
              </NavLink>
            </li>
            <li className="header-section-item">
              <NavLink
                to="/cart"
                activeClassName="active-link"
                className="in-active-link"
              >
                Cart
              </NavLink>
            </li>
          </ul>

          <button
            type="button"
            className="header-logout-button"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
      </div>
      {isActive && (
        <div className="header-sm-buttons-container">
          <ul className="header-nav-item-container">
            <li className="header-section-item">
              <NavLink
                exact
                to="/"
                activeClassName="active-link"
                className="in-active-link"
              >
                Home
              </NavLink>
            </li>
            <li className="header-section-item">
              <NavLink
                to="/cart"
                activeClassName="active-link"
                className="in-active-link"
              >
                Cart
              </NavLink>
            </li>
          </ul>
          <button
            type="button"
            className="header-logout-button"
            onClick={onClickLogout}
          >
            Logout
          </button>

          <button
            type="button"
            className="header-hamburger-close-button"
            onClick={onClickHamburgerButton}
          >
            <IoIosCloseCircle className="header-hamburger-close-icon" />
          </button>
        </div>
      )}
    </>
  )
}

export default withRouter(Header)
