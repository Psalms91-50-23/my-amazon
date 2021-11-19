import React from 'react'
import "../css/Product.css"
// import {  RatingView } from 'react-simple-star-rating'
import { connect } from 'react-redux'
import { addToCartAction } from '../actions/basketAction'

const Product = ({ itemId, title, image, price, rating, dispatch }) => {

    const addToBasket = () => {

        dispatch(addToCartAction( itemId, title, price, image, rating))

    }

    return (

        <div className="product" >
            <div className="product__info">
                <p>{title}</p>
                <p className="product__price">
                    <strong>$ {price.toFixed(2)}</strong>
                </p>
                <div className="product__rating">  
                    {Array(rating)
                    .fill()
                    .map((_, i) => (
                        <p key={i}>🌟</p>
                    ))}
                     {/* <RatingView ratingValue={rating} />  */}
                </div>
            </div>
            <img src={image} alt="" />
            <button onClick={addToBasket}>Add to Basket</button>
        </div>
        
    )
}


export default connect()(Product)
