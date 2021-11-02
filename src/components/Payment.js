import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch  } from 'react-redux'
import CartItem from './CartItem'
import "../css/Payment.css"
import "../css/Checkout.css"
import { NavLink, useHistory } from 'react-router-dom'
import { CardElement,  useElements, useStripe } from '@stripe/react-stripe-js'
import CurrencyFormat from 'react-currency-format';
// import { getTotalPrice } from './Subtotal'
import {  setTotalPrice } from '../actions/basketAction'
import axios from "../axios" //local file axios

const Payment = () => {


    const { basket, user, totalPrice } = useSelector(state => state.cart)
    const stripe = useStripe()
    const elements =  useElements()
    const dispatch = useDispatch() 
    const history = useHistory()

    const [ error, setError ] = useState(null)
    const [ disabled, setDisabled ] = useState(true)
    const [ succeeded, setSucceeded ] = useState(false)
    const [ processing, setProcessing ] = useState("")
    const [ currentTotal, setCurrentTotal ] = useState(0)
    const [ clientSecret, setClientSecret ] = useState(true)


    useEffect(() => {


        if(basket.length)
        {
            // setCurrentTotal(totalPrice?.toFixed(2))
            seTotalPrice(basket)
            const getClientSecret = async () => {

                const response = await axios({

                    method: "post",
                    //Stripe expects the total in a currency
                    url: `/payments/create?total=${totalPrice*100}`

                })
                setClientSecret(response.data.clientSecret)

            }
            getClientSecret()
        }
        else if(!basket.length) //if no items found in basket, take them back to product page
        {
            history.push("/")
        }
    },[basket])


    const handleSubmit = e => {

        e.preventDefault()
        setProcessing(true)

        //client secret is how much Stripe knows how much to charge
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent}) => {//comes back with response but we destructuring
            //paymentIntent (is what Stripe calls it) = payment confirmation

            setSucceeded(true)
            setError(null)
            setProcessing(false)

            history.replace("/orders")

        }) 
    }

    const handleChange = e => {

        setDisabled(e.empty)
        setError(e.error ? e.error.message : "")

    }

   

    function seTotalPrice(cart){
    
        const totalPriceArray = cart.map((item) => item.quantity? item.price*item.quantity : item.price) 
        const totalPrice = totalPriceArray?.reduce((currentTotal, currValue) => currentTotal+currValue)
        // setCurrentTotal(totalPrice.toFixed(2))
        dispatch(setTotalPrice(totalPrice.toFixed(2)))
    
    }


    return (

        <div className="payment">
            <div className="payment__container"> 
                 <h1>Checkout (
                     <NavLink to="/checkout">
                     {basket.length} items)
                     </NavLink>
                </h1>
                 <div className="payment__section">
                     <div className="payment__title">
                         <h3>Delivery Address</h3>
                     </div>
                     <div className="payment__address">
                         <h3>Payment Address</h3>
                         <p>{user?.email}</p>
                         <p>123 Random st</p>
                         <p>Los Angeles, CA</p>
                     </div>
                 </div>                 
                <div className="payment__section">
                     <div className="payment__title">   
                         <h3>Review Items and delivery</h3>           
                     </div>
                        <div className="payment__items">
                         {basket?.map((item,i) => {

                            return (
                            
                            <CartItem key={i} 
                                id={i}
                                itemId={item.itemId} 
                                title={item.title} 
                                image={item.image} 
                                price={item.price} 
                                rating={item.rating}
                             />
                             
                        )})
                        }
                    </div>
                </div>  
                <div className="payment__section">
                    <div>
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        {/* stripe magic */}
                        <p>
                            Total price: {currentTotal? currentTotal: 0 }
                        </p>
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>
                            <div className="payment__priceContainer">
                                <CurrencyFormat 
                                    renderText={(value) => {
                                        <h3>Order Total: {value}</h3>
                                    }}
                                    decimalScale={2}
                                    value={totalPrice? totalPrice : 0}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button disabled={ processing || disabled || succeeded } >
                                    <span>{processing? <p>Processing</p> : "Buy now"}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>         
            </div>
        </div>
        // <div className="payment">
        //     <div className="payment__container">
        //         <h1>Checkout ({basket.length} items)</h1>
        //         <div className="payment__section">
        //             <div className="payment__title">
        //                 <h3>Delivery Address</h3>
        //             </div>
        //             <div className="payment__address">
        //                 <h3>Payment Address</h3>
        //                 <p>{user?.email}</p>
        //                 <p>123 Random st</p>
        //                 <p>Los Angeles, CA</p>
        //             </div>
        //         </div>
        //         <div className="payment__section">
                    
        //         </div>
        //         <div className="payment__section">
        //             <div className="payment__title">   
        //                 <h3>Review Items and delivery</h3>           
        //             </div>
        //             <div className="payment__items">
        //                 {basket?.map((item,i) => {

        //                     return (
                            
        //                     <CartItem key={i} id={i}
        //                      itemId={item.itemId} title={item.title} image={item.image} price={item.price} rating={item.rating}/>
                             
        //                 )})
        //                 }
        //             </div>
        //         </div>           
        //     </div>            
        // </div>
    )
}

export default Payment
