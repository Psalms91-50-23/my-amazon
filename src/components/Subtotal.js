import React, { useState, useEffect } from 'react'
import "../css/Subtotal.css"
// import CurrencyFormat from 'react-currency-format'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { setTotalPrice } from '../actions/basketAction'

const Subtotal = () => {


    const dispatch = useDispatch()
    const history = useHistory()
    const basket = useSelector(state => state.cart.basket)
    const [ total, setTotal ] = useState(0)

    useEffect(() => {

        if(basket.length)
        {
            const  getTotalPrice = (cart) => {

                const totalPriceArray = cart.map((item) => item.quantity? item.price*item.quantity : item.price) 
                const totalPrice = totalPriceArray?.reduce((currentTotal, currValue) => currentTotal+currValue)
                dispatch(setTotalPrice(totalPrice))
                return totalPrice
            
            }

            setTotal(getTotalPrice(basket))
        }
        else{
            setTotal(0)
        }

    },[basket,dispatch])

    // function getTotalPrice(cart){

    //     const totalPriceArray = cart.map((item) => item.quantity? item.price*item.quantity : item.price) 
    //     const totalPrice = totalPriceArray?.reduce((currentTotal, currValue) => currentTotal+currValue)
    //     dispatch(setTotalPrice(totalPrice))
    //     return totalPrice
    
    // }

    function goCheckout(){

        if(basket.length)
        {
            history.push("/payment")
        }
        else{
            history.push("/")
        }
        
    }

    // console.log("history ",history)
    return (

        <div className="subtotal">
            <p>Subtotal ({basket.length} items):<br/><strong> $NZD {total.toFixed(2)}</strong></p>
            <small className="subtotal__gift">
                <input type="checkbox" /> This order contains a gift
            </small>
            <div className="button__container">
                <button onClick={ goCheckout }>Proceed to Checkout</button>
            </div>
        </div>
    )
}

export default Subtotal
