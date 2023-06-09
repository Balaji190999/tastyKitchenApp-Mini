import {Component} from 'react'

import {BiRupee} from 'react-icons/bi'
import {AiFillStar} from 'react-icons/ai'

import Counter from '../Counter'
import './index.css'

class RestaurantFoodItem extends Component {
  state = {
    updatedQuantity: 0,
    cartFood: {},
  }

  updateQuantity = value => {
    this.setState({updatedQuantity: value}, this.updateCartFood)
  }

  updateCartFood = () => {
    const {cartFood, updatedQuantity} = this.state
    const {id, name, imageUrl, cost} = cartFood
    this.setState(
      {
        cartFood: {
          id,
          name,
          imageUrl,
          cost,
          quantity: updatedQuantity,
        },
      },
      this.sendFoodToList,
    )
  }

  sendFoodToList = () => {
    const {cartFood} = this.state
    const {selectedFoodItemList} = this.props
    // Pass argument as Each Object with Updated quantity
    selectedFoodItemList(cartFood)
  }

  renderRestaurantFoodItem = () => {
    const {eachFoodItem} = this.props
    const {updatedQuantity} = this.state
    const {imageUrl, name, rating, cost, id, quantity} = eachFoodItem

    return (
      <li data-testid="foodItem" className="food-item">
        <img src={imageUrl} alt="foodItem" className="food-item-image" />
        <div className="food-item-content-container">
          <h1 className="food-item-name">{name}</h1>
          <p className="food-item-cost">
            <BiRupee />
            {cost}
          </p>
          <p className="food-item-rating">
            <AiFillStar className="food-item-star-icon" /> {rating}
          </p>
          {/* Here the ADD button uses the toggle method */}
          {updatedQuantity === 0 && (
            <button
              type="button"
              className="food-item-add-button"
              onClick={() =>
                this.onClickAddFoodItem(id, name, cost, imageUrl, quantity)
              }
            >
              ADD
            </button>
          )}

          {updatedQuantity !== 0 && (
            <Counter updateQuantity={this.updateQuantity} />
          )}
        </div>
      </li>
    )
  }

  onClickAddFoodItem = (id, name, cost, imageUrl, quantity) => {
    const selectedFoodItem = {
      id,
      name,
      imageUrl,
      cost,
      quantity,
    }

    this.setState({updatedQuantity: 1, cartFood: selectedFoodItem})
  }

  render() {
    return <>{this.renderRestaurantFoodItem()}</>
  }
}

export default RestaurantFoodItem
