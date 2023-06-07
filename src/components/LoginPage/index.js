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
        data-testid="login-page-main-container"
        className="login-page-main-container"
      >
        <img
          src="https://res.cloudinary.com/dusy8b5fn/image/upload/v1684322579/Rectangle_1457mobile_login_ofi0gy.jpg"
          alt="website login"
          className="login-page-image"
          data-testid="login-page-image"
        />
        <div data-testid="login-sm-content" className="login-sm-content">
          <h1 data-testid="login-heading" className="login-heading">
            Login
          </h1>
          <form onSubmit={this.onSubmitForm}>
            <div
              data-testid="login-username-container"
              className="login-username-container"
            >
              <label
                data-testid="login-label-text"
                htmlFor="username"
                className="login-label-text"
              >
                username
              </label>
              <input
                data-testid="login-input-element"
                type="text"
                id="username"
                className="login-input-element"
                onChange={this.onChangeUsername}
              />
            </div>
            <div
              data-testid="login-password-container"
              className="login-password-container"
            >
              <label
                data-testid="login-label-text"
                htmlFor="password"
                className="login-label-text"
              >
                password
              </label>
              <input
                data-testid="login-input-element"
                type="password"
                id="password"
                className="login-input-element"
                onChange={this.onChangePassword}
              />
            </div>
            {errorMsgStatus && <p className="login-failure-msg">{errorMsg}</p>}
            <button
              data-testid="login-button"
              type="submit"
              className="login-button"
            >
              Button
            </button>
          </form>
        </div>
        <div data-testid="login-lg-content" className="login-lg-content">
          <img
            src="https://res.cloudinary.com/dusy8b5fn/image/upload/v1684392912/Login-icon_ocbvwi.jpg"
            alt="website logo"
            className="login-lg-logo"
            data-testid="login-lg-logo"
          />
          <p
            data-testid="login-lg-tasty-kitchen-title"
            className="login-lg-tasty-kitchen-title"
          >
            Tasty Kitchens
          </p>
          <h1 data-testid="login-lg-heading" className="login-lg-heading">
            Login
          </h1>
          <form onSubmit={this.onSubmitForm}>
            <div
              data-testid="login-lg-username-container"
              className="login-lg-username-container"
            >
              <label
                data-testid="login-label-text"
                htmlFor="usernameLg"
                className="login-label-text"
              >
                username
              </label>
              <input
                type="text"
                id="usernameLg"
                className="login-input-element"
                data-testid="login-input-element"
                onChange={this.onChangeUsername}
              />
            </div>
            <div
              data-testid="login-lg-password-container"
              className="login-lg-password-container"
            >
              <label
                data-testid="login-label-text"
                htmlFor="passwordLg"
                className="login-label-text"
              >
                password
              </label>
              <input
                type="password"
                id="passwordLg"
                className="login-input-element"
                data-testid="login-input-element"
                onChange={this.onChangePassword}
              />
            </div>
            {errorMsgStatus && (
              <p className="login-lg-failure-msg">{errorMsg}</p>
            )}
            <button
              data-testid="login-lg-button"
              type="submit"
              className="login-lg-button"
            >
              Button
            </button>
          </form>
        </div>
        <img
          src="https://res.cloudinary.com/dusy8b5fn/image/upload/v1684392916/Login-large-image_milxx6.png"
          alt="website logo"
          className="login-lg-website-image"
          data-testid="login-lg-website-image"
        />
      </div>
    )
  }
}

export default LoginPage
