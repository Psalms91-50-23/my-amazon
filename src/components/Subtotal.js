import React, { useState, useEffect } from 'react'
import "../css/Subtotal.css"
// import CurrencyFormat from 'react-currency-format'
import { useSelector } from 'react-redux'


const Subtotal = () => {


    const cart = useSelector(state => state.cart.basket)
    const [ total, setTotal ] = useState(0)

    useEffect(() => {

        if(cart.length)
        {
            totalPrice(cart)
            // console.log("total price ", total)
        }
        else{
            setTotal(0)
        }

    },[cart])


    function totalPrice(cart){

       
        const totalPriceArray = cart.map((item, index) => item.quantity? item.price*item.quantity : item.price) 
        // console.log("total price array ", totalPriceArray)
        const totalPrice = totalPriceArray?.reduce((prevValue, currValue) => prevValue+currValue)
        setTotal(totalPrice)

    }


    // console.log("cart ", cart)
    
    return (

        <div className="subtotal">
            <p> Subtotal ({cart.length} items):<strong> $NZD {total.toFixed(2)}</strong></p>
            <small className="subtotal__gift">
                <input type="checkbox" /> This order contains a gift
            </small>
            {/* <CurrencyFormat 
            
                renderText={(value) => {
                    <>
                        <p>
                            Subtotal ({cart.length} items) : <strong>{total.toFixed(2)}</strong>
                        </p>
                        <small className="subtotal__gift">
                            <input type="checkbox" /> This order contains a gift
                        </small>
                    </>

                }}

                decimalScale={2}
                value={total}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            
            /> */}
            <div className="button__container">
                <button>Proceed to Checkout</button>
            </div>
        </div>
    )
}

export default Subtotal
