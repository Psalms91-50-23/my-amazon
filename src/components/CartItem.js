import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import "../css/CartItem.css"
import { removeFromCartAction, setQtyAction, setIdAction } from '../actions/basketAction'
import { useHistory } from 'react-router-dom'

const CartItem = (props) => {

    const { id, image, title, price, rating, total, qty } = props;
    const basket = useSelector(state => state.cart.basket)
    const history = useHistory()
    const { pathname } = history.location
    const [ itemQuantity, setItemQuanity ] = useState(1)
    const dispatch = useDispatch()

    useEffect(() => {

        //onComponentDidMount meaning at creation, i gave this cartItem an id passed in from props, 
        //will be used for removing from basket
        dispatch(setIdAction(id))
    
    },[id,dispatch])


    useEffect(() => {
        
        //now this has an id to reference and grab this particular cart item to set quantity
        //console.log("basekt in cartitem ", basket)
        basket.find(item => {
       
           if(item.id === id && item.quantity <= 0 )
           {

                setItemQuanity(1)
                return null

            }else if(item.id === id && item.quantity > 0 ){

                setItemQuanity(item.quantity)
                return null
            }
            return null
            
        })        
        

    },[basket,id])

    const onChangeSetQuanity = (e) => {
        
        setItemQuanity(e.target.value)
       
    }

    const removeFromBasket = () =>  {

        dispatch(removeFromCartAction(id))
    
    }

    const onSubmit= (e)=> {

        e.preventDefault()
        dispatch(setQtyAction(id,itemQuantity))

    }

    return (

        <div className="cartItem">
            <div className="cartItem__image__container">
                <img src={image} alt="" className="cartItem__image" />
            </div>
            <div className="cartItem__info">
                 
                <div className="cartItem__price__quantity">
                    <h4>{title}</h4>
                    <strong className="cartItem__sale_price">Sale price: $ {price.toFixed(2)}</strong>
                    
                    {pathname !== "/orders" ?
                    (
                        <>
                            <form  onSubmit={(e) => onSubmit(e)}>
                                <label htmlFor="cartItem__quantity"><strong>QTY:</strong></label>
                                <input type="text"id="cartItem__quantity"  maxLength={3} onChange={(e)=>onChangeSetQuanity(e)} value={itemQuantity}/>
                                {/* <input type="submit"/> */}
                                <button className="form__button" type="submit">Set</button>
                            </form>
                        </>
                    )
                    :
                    <strong>Qty: {qty}</strong>
                    }
                    <strong>Total price: $ {total?.toFixed(2)}</strong>
                </div>
                <div className="cartItem__rating">
                    {Array(rating)
                    .fill()
                    .map((_, i) => (
                        <p key={i}>????</p>
                    ))}
                </div>
                 {/* <RatingView ratingValue={rating} /> */}
                 {pathname !== "/orders" ?

                    <button  onClick={removeFromBasket}>Remove from Cart</button>   
                    :
                    ""
                 }
                             
            </div>
        </div>
        
    )
}

export default CartItem
