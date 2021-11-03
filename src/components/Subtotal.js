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
            setTotal(getTotalPrice(basket))
            // console.log("total price ", total)
        }
        else{
            setTotal(0)
        }

    },[basket])

    function getTotalPrice(cart){

       
        const totalPriceArray = cart.map((item) => item.quantity? item.price*item.quantity : item.price) 
        // console.log("total price array ", totalPriceArray)
        const totalPrice = totalPriceArray?.reduce((currentTotal, currValue) => currentTotal+currValue)
        // setTotal(totalPrice)
        dispatch(setTotalPrice(totalPrice))
        return totalPrice
    
    }

    function goCheckout(e){

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
            <p> Subtotal ({basket.length} items):<strong> $NZD {total.toFixed(2)}</strong></p>
            <small className="subtotal__gift">
                <input type="checkbox" /> This order contains a gift
            </small>
            <div className="button__container">
                <button onClick={ e => goCheckout(e)}>Proceed to Checkout</button>
            </div>
        </div>
    )
}


export default Subtotal
