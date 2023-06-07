import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import Header from '../Header'
import RestaurantFoodItem from '../RestaurantFoodItem'

import './index.css'
import Footer from '../Footer'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  isLoading: 'IS_LOADING',
  failure: 'failure',
}

class RestaurantDetailItem extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    restaurantDetails: {},
    foodList: [],
    cartFoodList: [],
    currentObject: {},
    uniqueFoodList: [],
  }

  componentDidMount() {
    this.getRestaurantFoodDetails()
  }

  getRestaurantFoodDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    this.setState({apiStatus: apiStatusConstants.isLoading})
    const restaurantDetailUrl = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(restaurantDetailUrl, options)
    if (response.ok === true) {
      const responseData = await response.json()
      const updatedRestaurantDetail = {
        id: responseData.id,
        costForTwo: responseData.cost_for_two,
        cuisine: responseData.cuisine,
        imageUrl: responseData.image_url,
        itemsCount: responseData.items_count,
        location: responseData.location,
        name: responseData.name,
        rating: responseData.rating,
        reviewsCount: responseData.reviews_count,
      }

      const updatedFoodList = responseData.food_items.map(eachItem => ({
        id: eachItem.id,
        cost: eachItem.cost,
        foodType: eachItem.food_type,
        imageUrl: eachItem.image_url,
        name: eachItem.name,
        rating: eachItem.rating,
        quantity: 0,
      }))

      this.setState({
        restaurantDetails: updatedRestaurantDetail,
        foodList: updatedFoodList,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderRestaurantDetailLoader = () => (
    <div
      data-testid="restaurant-details-loader"
      className="restaurant-details-loader-container"
    >
      <Loader type="TailSpin" color="#F7931E" height="50" width="50" />
    </div>
  )

  selectedFoodItemList = foodObject => {
    this.setState(
      prevState => ({
        cartFoodList: [...prevState.cartFoodList, foodObject],
        currentObject: foodObject,
      }),
      this.updatedSelectedObjectList,
    )
  }

  updatedSelectedObjectList = () => {
    const {currentObject} = this.state

    this.setState(prevState => {
      const updatedCart = prevState.cartFoodList.map(item => {
        if (item.id === currentObject.id) {
          // Create a new object with the updated quantity
          return {
            ...item,
            quantity: currentObject.quantity,
          }
        }
        return item
      })

      return {
        cartFoodList: updatedCart,
      }
    }, this.uniqueSelectedFoodList)
  }

  uniqueSelectedFoodList = () => {
    // Remove duplicate object in state list
    // {uniqueFoodList} is final updated list.
    this.setState(prevState => {
      const uniqueList = []
      prevState.cartFoodList.forEach(eachItem => {
        if (!uniqueList.some(item => item.id === eachItem.id)) {
          uniqueList.push(eachItem)
        }
      })
      return {uniqueFoodList: uniqueList}
    }, this.storeFinalListInLocalStorage)
  }

  storeFinalListInLocalStorage = () => {
    const {uniqueFoodList} = this.state
    // Store list in Local Storage

    localStorage.setItem('cartFoodItem', JSON.stringify(uniqueFoodList))
  }

  renderRestaurantDetailSuccess = () => {
    const {restaurantDetails, foodList} = this.state
    const {
      imageUrl,
      name,
      cuisine,
      location,
      rating,
      reviewsCount,
      costForTwo,
    } = restaurantDetails
    return (
      <>
        <div className="restaurant-details-top-container">
          <img src={imageUrl} alt="restaurant" className="restaurant-image" />
          <h1 className="restaurant-name">{name}</h1>
          <p className="restaurant-cuisine">{cuisine}</p>
          <p className="restaurant-location">{location}</p>
          <AiFillStar className="restaurant-detail-star-icon" />
          <p className="restaurant-rating">{rating}</p>
          <p className="restaurant-reviews-count">{reviewsCount}+ Ratings</p>
          <hr className="restaurant-detail-hr-line" />
          <p className="restaurant-cost-detail">{costForTwo}</p>
          <p className="restaurant-cost-for-two-text">Cost for two</p>
        </div>
        <ul className="restaurant-food-item-list-container">
          {foodList.map(eachItem => (
            <RestaurantFoodItem
              eachFoodItem={eachItem}
              key={eachItem.id}
              selectedFoodItemList={this.selectedFoodItemList}
            />
          ))}
        </ul>
      </>
    )
  }

  renderSwitchRestaurantDetail = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.isLoading:
        return this.renderRestaurantDetailLoader()
      case apiStatusConstants.success:
        return this.renderRestaurantDetailSuccess()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="restaurant-details-main-container">
        <Header />
        {this.renderSwitchRestaurantDetail()}
        <div className="restaurant-detail-footer-container">
          <Footer />
        </div>
      </div>
    )
  }
}

export default RestaurantDetailItem
