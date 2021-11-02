import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import CartItem from './CartItem'
import "../css/Payment.css"
import "../css/Checkout.css"
import { NavLink } from 'react-router-dom'


const Payment = () => {


    const { basket, user } = useSelector(state => state.cart)
 
    // console.log("basket in payment ", basket)
    return (

        <div className="payment">
            <div className="payment__container"> 
                 <h1>Checkout ({basket.length} items)</h1>
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
