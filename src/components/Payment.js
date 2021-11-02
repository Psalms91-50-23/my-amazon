import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch  } from 'react-redux'
import CartItem from './CartItem'
import "../css/Payment.css"
import "../css/Checkout.css"
import { NavLink, useHistory } from 'react-router-dom'
import { CardElement,  useElements, useStripe } from '@stripe/react-stripe-js'
import CurrencyFormat from 'react-currency-format';
// import { getTotalPrice } from './Subtotal'
import { setQtyAction, setTotalPrice } from '../actions/basketAction'


const Payment = () => {


    const { basket, user, totalPrice } = useSelector(state => state.cart)
    const stripe = useStripe()
    const elements =  useElements()
    const dispatch = useDispatch()
    const history = useHistory()

    const [ error, setError ] = useState(null)
    const [ disable, setDisable ] = useState(true)
    const [ currentTotal, setCurrentTotal ] = useState(0)



 
    const handleSubmit = e => {



    }

    const handleChange = e => {

        setDisable(e.empty)
        setError(e.error ? e.error.message : "")

    }

    useEffect(() => {

        if(basket.length)
        {
            // setCurrentTotal(totalPrice?.toFixed(2))
            seTotalPrice(basket)
        }
        else if(!basket.length) //if no items found in basket, take them back to product page
        {
            history.push("/")
        }
    },[basket])

    function seTotalPrice(cart){
    
        const totalPriceArray = cart.map((item) => item.quantity? item.price*item.quantity : item.price) 
        const totalPrice = totalPriceArray?.reduce((currentTotal, currValue) => currentTotal+currValue)
        setCurrentTotal(totalPrice.toFixed(2))
        dispatch(setTotalPrice(totalPrice))
    
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
                            
                            <CartItem key={i} id={i}
                             itemId={item.itemId} title={item.title} image={item.image} price={item.price} rating={item.rating}/>
                             
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
