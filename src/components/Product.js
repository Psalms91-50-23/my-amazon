import React, { useState, useEffect } from 'react'
import "../css/Product.css"
import { Rating, RatingView } from 'react-simple-star-rating'
import { connect } from 'react-redux'
import { addToCartAction } from '../actions/basketAction'

const Product = ({ itemId, title, image, price, rating, dispatch }) => {


    // const [ checkout, setCheckout ] = useState(false)

    const addToBasket = () => {

        dispatch(addToCartAction( itemId, title,price, image, rating))

    }

    // const removeFromBasket = () =>  {

    //     dispatch(removeFromCartAction(id))
    // }


    return (

        <div className="product">
            <div className="product__info">
                <p>{title}</p>
                <p className="product__price">
                    {/* <strong>$ </strong> */}
                    <strong>$ {price}</strong>
                </p>
                <div className="product__rating">  
                    <RatingView ratingValue={rating} /* RatingView Props */ /> 
                </div>
            </div>
            <img src={image} alt="" />
            <button onClick={addToBasket}>Add to Basket</button>
           {/* {
               checkState? <button onClick={removeFromBasket}> Remove from Basket </button> : <button onClick={addToBasket}>Add to Basket</button>
           }
             */}
        </div>
        
    )
}


export default connect()(Product)
