import './index.css'

const PopularRestaurantHeader = props => {
  const {sortByOptions, activeOptionId, onUpdateActiveOptionId} = props
  const onChangeSortByOption = event => {
    onUpdateActiveOptionId(event.target.value)
  }

  return (
    <div className="home-sort-by-option-main-container">
      <p className="home-sort-by-text">Sort by</p>
      <select
        value={activeOptionId}
        className="sort-by-select"
        onChange={onChangeSortByOption}
      >
        {sortByOptions.map(eachItem => (
          <option
            key={eachItem.id}
            value={eachItem.value}
            className="sort-by-option"
          >
            {eachItem.displayText}
          </option>
        ))}
      </select>
    </div>
  )
}

export default PopularRestaurantHeader
