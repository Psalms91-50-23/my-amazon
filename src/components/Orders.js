import React, { useState, useEffect } from 'react'
import { db } from "../firebase"
import "../css/Orders.css"
import { useSelector } from 'react-redux'
import Order from './Order'
// import { useHistory } from 'react-router-dom'

const Orders = () => {

    const [ orders, setOrders ] = useState([])
    const { user } = useSelector(state => state.cart )
    // const { dispatch, user, basket } = props
    // const history = useHistory()
    // const { pathname } = history.location

    // console.log("props in order ",props)
    // console.log("user ", user)
    // console.log("basket ", basket)

    useEffect(() => {

        if(user)
        {
            db
            .collection("users")//enter in users table
            .doc(user?.uid) //go into the document on user
            .collection("orders")//enter orders table
            .orderBy("created","desc") //we already pushed in a created field, in paymetn.js
            .onSnapshot(snapshot => {
            //.docs means returning it as documents
            // console.log("snapshot ",snapshot)
                //docs from orders table
                setOrders(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))

            })
        }else{
            setOrders([])
        }
        

    },[user])

    // console.log("orders.js ", orders);
    return (
        <div className="orders">
            {user? 
            <>
                <h2>Your Order History</h2>
                <div className="orders__order">
                { orders?.map((order,i) => {
                return ( <Order key={i} order={order}/>)
                })
                }
                </div>
            </>
            : 
            <h2>Can only view History of orders if registered and logged in</h2>}    
        </div>
    )
}

export default Orders
