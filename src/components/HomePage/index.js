import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BiSearch} from 'react-icons/bi'
import {IoIosArrowForward, IoIosArrowBack} from 'react-icons/io'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import {BsFilterLeft} from 'react-icons/bs'

import Header from '../Header'
import OfferListItem from '../OfferImageItem'
import PopularRestaurantHeader from '../PopularRestaurantHeader'
import RestaurantItem from '../RestaurantItem'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  isLoading: 'IS_LOADING',
  failure: 'failure',
}

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class HomePage extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    activeOptionId: sortByOptions[1].value,
    apiStatusForRestaurant: apiStatusConstants.initial,
    searchInput: '',
    offset: '0',
    limit: '9',
    restaurantList: [],
    activePage: 1,
    offerCarousel: [],
  }

  componentDidMount() {
    this.getOfferList()
    this.getRestaurantList()
  }

  // API for Restaurant list
  getRestaurantList = async () => {
    const {searchInput, activeOptionId, offset, limit} = this.state
    this.setState({apiStatusForRestaurant: apiStatusConstants.isLoading})
    const jwtToken = Cookies.get('jwt_token')

    const restaurantListUrl = `https://apis.ccbp.in/restaurants-list?search=${searchInput}&offset=${offset}&limit=${limit}&sort_by_rating=${activeOptionId}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(restaurantListUrl, options)
    if (response.ok === true) {
      const responseData = await response.json()
      const updatedData = responseData.restaurants.map(eachItem => ({
        id: eachItem.id,
        imageUrl: eachItem.image_url,
        name: eachItem.name,
        cuisine: eachItem.cuisine,
        rating: eachItem.user_rating.rating,
        totalReviews: eachItem.user_rating.total_reviews,
      }))

      this.setState({
        restaurantList: updatedData,
        apiStatusForRestaurant: apiStatusConstants.success,
      })
    }
  }

  // API for offer image
  getOfferList = async () => {
    const jwtToken = Cookies.get('jwt_token')
    this.setState({apiStatus: apiStatusConstants.isLoading})
    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const offerCarouselImage = await response.json()

      const updatedCarouseList = offerCarouselImage.offers.map(eachItem => ({
        id: eachItem.id,
        imageUrl: eachItem.image_url,
      }))
      this.setState({
        offerCarousel: updatedCarouseList,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  onUpdateActiveOptionId = activeId => {
    this.setState({activeOptionId: activeId}, this.getRestaurantList)
  }

  onChangeSearchInput = event => {
    this.setState(
      {searchInput: event.target.value.toLowerCase()},
      this.getRestaurantList,
    )
  }

  onClickSearchPopularRestaurants = () => {
    this.getRestaurantList()
  }

  // Loader For Restaurant List
  renderRestaurantLoading = () => (
    <div
      data-testid="restaurants-list-loader"
      className="home-restaurant-list-loader-container"
    >
      <Loader type="TailSpin" color="#F7931E" height="50" width="50" />
    </div>
  )

  renderRestaurantList = () => {
    const {restaurantList, activePage} = this.state

    return (
      <>
        <ul className="restaurant-items-container">
          {restaurantList.map(eachItem => (
            <RestaurantItem eachRestaurantItem={eachItem} key={eachItem.id} />
          ))}
        </ul>
        <div className="home-pagination-container">
          <button
            type="button"
            className="home-pagination-button"
            data-testid="pagination-left-button"
            disabled={activePage === 1}
            onClick={this.onClickArrowBackword}
          >
            <IoIosArrowBack color="#334155" />
          </button>
          <p className="home-total-page-number">
            <span data-testid="active-page-number">{activePage}</span> of 4
          </p>
          <button
            type="button"
            className="home-pagination-button"
            data-testid="pagination-right-button"
            disabled={activePage >= 4}
            onClick={this.onClickArrowForward}
          >
            <IoIosArrowForward color="#334155" />
          </button>
        </div>
      </>
    )
  }

  onClickArrowForward = () => {
    this.setState(
      prevState => ({
        activePage: prevState.activePage + 1,
      }),
      this.onIncrementOffsetValue,
    )
  }

  onIncrementOffsetValue = () => {
    const {activePage, limit} = this.state
    const offsetValue = (activePage - 1) * limit
    this.setState({offset: offsetValue}, this.getRestaurantList)
  }

  onClickArrowBackword = () => {
    this.setState(
      prevState => ({
        activePage: prevState.activePage - 1,
      }),
      this.onDecrementOffsetValue,
    )
  }

  onDecrementOffsetValue = () => {
    const {activePage, limit} = this.state
    const offsetValue = (activePage - 1) * limit
    this.setState({offset: offsetValue}, this.getRestaurantList)
  }

  // Loader For Offer Image
  renderOfferLoading = () => (
    <div
      data-testid="restaurants-offers-loader"
      className="home-offer-image-loader-container"
    >
      <Loader type="TailSpin" color="#F7931E" height="50" width="50" />
    </div>
  )

  renderOfferImageList = () => {
    const {offerCarousel} = this.state
    const settings = {
      dots: true,
      slidesToScroll: 1,
      slidesToShow: 1,
    }

    return (
      <div className="slider-container">
        <Slider {...settings}>
          {offerCarousel.map(eachItem => (
            <OfferListItem eachCarouselImage={eachItem} key={eachItem.id} />
          ))}
        </Slider>
      </div>
    )
  }

  renderSwitchOfferImage = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.isLoading:
        return this.renderOfferLoading()
      case apiStatusConstants.success:
        return this.renderOfferImageList()
      default:
        return null
    }
  }

  renderSwitchRestaurantList = () => {
    const {apiStatusForRestaurant} = this.state
    switch (apiStatusForRestaurant) {
      case apiStatusConstants.isLoading:
        return this.renderRestaurantLoading()
      case apiStatusConstants.success:
        return this.renderRestaurantList()
      default:
        return null
    }
  }

  render() {
    const {activeOptionId} = this.state
    return (
      <div className="home-main-container">
        <Header />
        {this.renderSwitchOfferImage()}
        <div className="home-restaurant-lg-container">
          <h1 className="home-tittle">Popular Restaurants</h1>
          <p className="home-description">
            Select Your favourite restaurant special dish and make your day
            happy...
          </p>
          <BsFilterLeft className="home-filter-icon" />
          <PopularRestaurantHeader
            sortByOptions={sortByOptions}
            activeOptionId={activeOptionId}
            onUpdateActiveOptionId={this.onUpdateActiveOptionId}
          />
          <div className="home-restaurant-search-container">
            <input
              type="search"
              placeholder="Search here..."
              className="home-search-input"
              onChange={this.onChangeSearchInput}
            />
            <button
              type="button"
              className="home-search-button"
              onClick={this.onClickSearchPopularRestaurants}
            >
              <BiSearch className="home-search-icon" />
            </button>
          </div>
          <hr className="home-hr-line-for-lg" />
          {this.renderSwitchRestaurantList()}
        </div>
        <div className="home-footer-container">
          <Footer />
        </div>
      </div>
    )
  }
}

export default HomePage
