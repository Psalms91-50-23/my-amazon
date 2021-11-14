import React from 'react'
import "../css/Order.css"
import CartItem from './CartItem'
import moment from "moment"
import CurrencyFormat from 'react-currency-format'

const Order = ({ order }) => {

    // id, itemId, image, title, price, rating

    return (
        <div className="order">
            <h2>Order</h2>
            <p className="order__id">Order Time: {moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}
            </p>
            {order.data.basket?.map((item, i) => {

                return(   
                     <CartItem 
                        key={i} 
                        id={i} 
                        itemId={item.itemId} 
                        title={item.title} 
                        image={item.image} 
                        price={item.price} 
                        rating={item.rating}
                        total={item.total}
                        qty={item.quantity}
                    />)
            })
            }
            {/* <h3></h3> */}
            <CurrencyFormat 
                renderText={(value) => {
                    return (<h3 className="order__total">Order Total: {value}</h3>)
                }}
                decimalScale={2}
                value={order.data.amount / 100}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$NZD "} 
            />

        </div>
    )
}

export default Order
