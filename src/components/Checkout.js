import React from 'react'
import Subtotal from './Subtotal'
import "../css/Checkout.css"
import { useSelector } from 'react-redux';
import CartItem from './CartItem';
import { NavLink } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const Checkout = () => {

    const basket = useSelector(state => state.cart.basket)

    // console.log("basket in checkout ", basket)

    return (

        <div className="checkout">
            <div className="checkout__left">
                <img className="checkout__ad" src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg" alt="" />
                <div className="checkout__title">
                    <h2>Shopping Cart
                    </h2>
                    {
                        basket.length ? <NavLink to="/"><ArrowBackIcon />Shop</NavLink> : ""
                    }
                </div>

                <div className="cart__item">
                    {basket.length ?
                        (basket?.map((item, i) => {

                            return (

                                <CartItem key={`${i}_${item.itemId}`} id={i} title={item.title} image={item.image} price={item.price} rating={item.rating} total={item.total}/>

                            )

                        }))
                        :
                        <NavLink to="/">Nothing in Cart, Go add Products</NavLink>
                    }

                </div>
            </div>
            <div className="checkout__right">
                <Subtotal />
            </div>

        </div>
    )
}

export default Checkout
