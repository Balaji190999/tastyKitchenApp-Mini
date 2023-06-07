import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

const RestaurantItem = props => {
  const {eachRestaurantItem} = props
  const {imageUrl, name, cuisine, rating, totalReviews, id} = eachRestaurantItem
  return (
    <Link to={`/restaurant/${id}`} className="restaurant-item-link">
      <li data-testid="restaurant-item" className="restaurant-item">
        <img
          src={imageUrl}
          alt="restaurant"
          className="restaurant-item-image"
        />
        <div className="restaurant-item-content-container">
          <h1 className="restaurant-item-name">{name}</h1>
          <p className="restaurant-item-cuisine">{cuisine}</p>
          <div className="restaurant-item-rating-container">
            <AiFillStar className="restaurant-item-rating-icon" />
            <p className="restaurant-item-rating">{rating}</p>
            <p className="restaurant-item-total-reviews">
              ({totalReviews} ratings)
            </p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default RestaurantItem
