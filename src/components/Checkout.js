import React, { useState, useEffect } from 'react'
import Subtotal from './Subtotal'
import "../css/Checkout.css"
import { useSelector } from 'react-redux';
import Product from './Product';
import CartItem from './CartItem';

const Checkout = () => {

    const basket = useSelector(state => state.cart.basket)
    const [ cart, setCart ] = useState([])
    // const [ checkState, setCheckState ] = useState(false)

    useEffect(() => {

        setCart(basket)
        // setCheckState(true)

    },[basket])

    return (
        <div className="checkout">
            <div className="checkout__left">                  
                <img className="checkout__ad" src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg" alt="" />
                <div className="checkout__title">
                     <h2>Shopping Cart
                     </h2>
                     {/* <a href="#">Deselect all items</a> */}
                     
                 </div>
                 <div className="cart__item">
                 {cart?.map((item, i) => {

                        return (
                        // <Product key={i} id={i} itemId={item.itemId} title={item.title} image={item.image} price={item.price} rating={item.rating} checkState={checkState}/>

                            <CartItem key={i} id={i} itemId={item.itemId} title={item.title} image={item.image} price={item.price} rating={item.rating}/>

                        )

                        })}
                </div>
                {/* <Subtotal />        */}
            </div>
            <div className="checkout__right">
                <Subtotal />
            </div> 
           
        </div>
    )
}

export default Checkout
