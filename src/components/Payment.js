import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch  } from 'react-redux'
import CartItem from './CartItem'
import "../css/Payment.css"
import { NavLink, useHistory } from 'react-router-dom'
import { CardElement,  useElements, useStripe } from '@stripe/react-stripe-js'
import CurrencyFormat from 'react-currency-format';
import {  setTotalPrice, emptyBasket } from '../actions/basketAction'
import axios from "../axios" //local file axios
import { db } from  "../firebase"
import StoreIcon from '@mui/icons-material/Store';

const Payment = () => {


    const { basket, user, totalPrice, userGeoLocation } = useSelector(state => state.cart)
    const stripe = useStripe()
    const elements =  useElements()
    const dispatch = useDispatch() 
    const history = useHistory()
    const [ error, setError ] = useState(null)
    const [ disabled, setDisabled ] = useState(true)
    const [ succeeded, setSucceeded ] = useState(false)
    const [ processing, setProcessing ] = useState("")
    // const [ currentBasket, setCurrentBasket ] = useState([])
    const [ clientSecret, setClientSecret ] = useState(true)

 
    useEffect(() => {


        if(basket.length)
        {
            
            const seTotalPrice = (cart) => {
            
                const totalPriceArray = cart.map((item) => {
                    
                    if(!item.quantity)
                    {

                        return item.price

                    }else
                    {
                        
                        return item.price*item.quantity

                    }

                }) 
                const currentTotal = totalPriceArray?.reduce((currentTotal, currValue) => currentTotal+currValue)
                dispatch(setTotalPrice(currentTotal.toFixed(2)))
            
            }

            seTotalPrice(basket)
            const getClientSecret = async () => {

                const response = await axios({

                    method: "post",
                    url: `/payment/create?total=${totalPrice*100}`,
                    //Stripe expects the total in a currencies subunits

                })

                // console.log("response in payment.js ",response);
                setClientSecret(response.data.clientSecret) 
                
            }
            getClientSecret()
        }else 
        {
            dispatch(setTotalPrice(0))
            // history.push("/")
        }

    },[basket,dispatch,totalPrice])

    // console.log("client secret ", clientSecret);

    const handleSubmit = async e => {

        e.preventDefault()
        setProcessing(true)

        //client secret is how much Stripe knows how much to charge user
         await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then( response  => {
            //comes back with response but we destructuring
            //paymentIntent (is what Stripe calls it) = payment confirmation
            const { paymentIntent } = response
            // console.log("response ", response);

            db
            .collection("users")//nosql data structure, users table
            .doc(user?.uid)
            .collection("orders") //orders table
            .doc(paymentIntent.id) 
            .set({
                basket: basket,
                amount: paymentIntent.amount, //comes back from stripe
                created: paymentIntent.created //timestamp made
            })

            setSucceeded(true)
            setError(null)
            setProcessing(false)

            dispatch(emptyBasket())
            history.replace("/orders")
            //replace instead of push so that they dont go in a loop when browser back button is pushed

        }).catch(error => console.error(error.message))

    }

    const handleChange = e => {

        setDisabled(e.empty)
        setError(e.error ? e.error.message : "")

    }

    // console.log("payment address ",userGeoLocation)
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
                         {userGeoLocation?  
                            <p>{userGeoLocation.address}</p>
                            // <p>{userGeoLocation.location[0]}, {userGeoLocation.location[1]}</p>
                            :
                            <>
                                <p>123 Random St</p>
                                <p>Auckland, New Zealand</p>
                            </>
                         }
                        
                     </div>
                 </div>                 
                <div className="payment__section">
                     <div className="payment__title"> 
                     {basket.length ? 
                     <h3>Review Items and delivery</h3>  
                     :
                     <h3>Nothing To Pay for</h3>     
                     }  
                               
                     </div>
                     {!basket.length && (<NavLink to={"/"}><StoreIcon/> Back To Shop </NavLink>)}
                        <div className="payment__items">
                         {basket?.map((item,i) => {

                            return (
                            
                            <CartItem 
                                key={i} 
                                id={i}
                                itemId={item.itemId} 
                                title={item.title} 
                                image={item.image} 
                                price={item.price} 
                                rating={item.rating}
                                total={item.total}
                             />
                             
                        )})
                        }
                    </div>
                </div>
                {basket.length ?
                    (
                    <div className="payment__section">
                        <div>
                            <h3>Payment Method</h3>
                        </div>
                        <div className="payment__details">
                            {/* stripe magic */}    
                            <form onSubmit={handleSubmit}>
                                <CardElement onChange={handleChange}/>
                                <div className="payment__priceContainer">
                                    <CurrencyFormat 
                                        renderText={(value) => {
                                            return (<h3 className="order__total">Payment Total: {value}</h3>)
                                        }}
                                        decimalScale={2}
                                        value={totalPrice? totalPrice : 0.00}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        prefix={"$NZD "} 
                                    />
                                    <button disabled={ processing || disabled || succeeded } > 
                                        <span>{processing? <p>Processing</p> : "Buy now"}</span>
                                    </button>
                                </div>
                                {error && <div>{error}</div>}
                            </form>
                        </div>
                    </div>)
                :
                ""   
                }  
            </div>
        </div>
       
    )
}

export default Payment
