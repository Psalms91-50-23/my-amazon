import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import "../css/CartItem.css"
import { Rating, RatingView } from 'react-simple-star-rating'
import { removeFromCartAction, setQtyAction, setIdAction } from '../actions/basketAction'

const CartItem = ({ id, itemId, image, title, price, rating }) => {

    const basket = useSelector(state => state.cart.basket)

    
    const [ itemQuantity, setItemQuanity ] = useState(1)

    const dispatch = useDispatch()

    useEffect(() => {

        //onComponentDidMount meaning at creation, i gave this cartItem an id passed in from props
        dispatch(setIdAction(id))
   
    },[])


    useEffect(() => {
        
        //now this has an id to reference and grab this particular cart item to set quantity
        // console.log("basekt in cartitem ", basket)
        basket.find(item => {
       
           if(item.id === id)
           {
               setItemQuanity(item.quantity)
           }
            
        })        
        
    },[basket])

    const onChangeSetQuanity = (e) => {

        setItemQuanity(e.target.value)

    }

    const removeFromBasket = () =>  {

        dispatch(removeFromCartAction(id))

    }

    const  onSubmit= (e)=> {

        e.preventDefault()
        dispatch(setQtyAction(id,itemQuantity))

    }

    return (

        <div className="cartItem">
            <div className="cartItem__image__container">
                <img src={image} alt="" className="cartItem__image" />
            </div>
            <div className="cartItem__info">
                 <p>{title}</p>
                <div className="cartItem__price__quantity">
                    <strong>$ {price}</strong>
                    <form  onSubmit={(e) => onSubmit(e)}>
                        <label htmlFor="cartItem__quantity"><strong>QTY:</strong></label>
                        <input type="text"id="cartItem__quantity"  maxLength={3} onChange={(e)=>onChangeSetQuanity(e)} value={itemQuantity}/>
                        {/* <input type="submit"/> */}
                        <button className="form__button" type="submit">add QTY</button>
                    </form>
                </div>
                 <RatingView ratingValue={rating} />
                 <button  onClick={removeFromBasket}>Remove from Cart</button>               
            </div>
        </div>
        
    )
}

export default CartItem
