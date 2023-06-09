import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
    errorMsgStatus: false,
    errorMsg: '',
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const loginUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(loginUrl, options)
    const responseData = await response.json()
    console.log(responseData)
    if (response.ok === true) {
      this.onSuccessfullLogin(responseData.jwt_token)
    } else {
      this.setState({errorMsgStatus: true, errorMsg: responseData.error_msg})
    }
  }

  onSuccessfullLogin = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {errorMsgStatus, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div
        data-data-testid="login-page-main-container"
        className="login-page-main-container"
      >
        <img
          src="https://res.cloudinary.com/dusy8b5fn/image/upload/v1684322579/Rectangle_1457mobile_login_ofi0gy.jpg"
          alt="website login"
          className="login-page-image"
        />
        <div data-data-testid="login-sm-content" className="login-sm-content">
          <p data-data-testid="login-heading" className="login-heading">
            Login
          </p>
          <form onSubmit={this.onSubmitForm}>
            <div
              data-data-testid="login-username-container"
              className="login-username-container"
            >
              <label htmlFor="username" className="login-label-text">
                USERNAME
              </label>
              <input
                type="text"
                id="username"
                className="login-input-element"
                onChange={this.onChangeUsername}
              />
            </div>
            <div
              data-data-testid="login-password-container"
              className="login-password-container"
            >
              <label htmlFor="password" className="login-label-text">
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                className="login-input-element"
                onChange={this.onChangePassword}
              />
            </div>
            {errorMsgStatus && <p className="login-failure-msg">{errorMsg}</p>}
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
        <div data-data-testid="login-lg-content" className="login-lg-content">
          <img
            src="https://res.cloudinary.com/dusy8b5fn/image/upload/v1684392912/Login-icon_ocbvwi.jpg"
            alt="website logo"
            className="login-lg-logo"
          />
          <h1
            data-data-testid="login-lg-tasty-kitchen-title"
            className="login-lg-tasty-kitchen-title"
          >
            Tasty Kitchens
          </h1>
          <h1 data-data-testid="login-lg-heading" className="login-lg-heading">
            Login
          </h1>
          <form onSubmit={this.onSubmitForm}>
            <div
              data-data-testid="login-lg-username-container"
              className="login-lg-username-container"
            >
              <label htmlFor="usernameLg" className="login-label-text">
                USERNAME
              </label>
              <input
                type="text"
                id="usernameLg"
                className="login-input-element"
                onChange={this.onChangeUsername}
              />
            </div>
            <div
              data-data-testid="login-lg-password-container"
              className="login-lg-password-container"
            >
              <label htmlFor="passwordLg" className="login-label-text">
                PASSWORD
              </label>
              <input
                type="password"
                id="passwordLg"
                className="login-input-element"
                onChange={this.onChangePassword}
              />
            </div>
            {errorMsgStatus && (
              <p className="login-lg-failure-msg">{errorMsg}</p>
            )}
            <button type="submit" className="login-lg-button">
              Login
            </button>
          </form>
        </div>
        <img
          src="https://res.cloudinary.com/dusy8b5fn/image/upload/v1684392916/Login-large-image_milxx6.png"
          alt="website logo"
          className="login-lg-website-image"
        />
      </div>
    )
  }
}

export default LoginPage
