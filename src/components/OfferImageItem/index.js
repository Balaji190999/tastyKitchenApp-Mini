import './index.css'

const OfferImageItem = props => {
  const {eachCarouselImage} = props
  const {imageUrl} = eachCarouselImage
  return (
    <div>
      <img src={imageUrl} alt="offer" className="offer-image-item" />
    </div>
  )
}

export default OfferImageItem
