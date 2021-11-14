import React, { useState, useEffect } from 'react'
import { db } from "../firebase"
import "../css/Orders.css"
import { useSelector, connect } from 'react-redux'
import Order from './Order'
import { useHistory } from 'react-router-dom'

const Orders = () => {

    const [ orders, setOrders ] = useState([])
    const { basket, user } = useSelector(state => state.cart )
    // const { dispatch, user, basket } = props
    const history = useHistory()
    const { pathname } = history.location

    // console.log("props in order ",props)
    // console.log("user ", user)
    // console.log("basket ", basket)

    useEffect(() => {

        if(user)
        {
            db
            .collection("users")
            .doc(user?.uid) //go into the document on user
            .collection("orders")
            .orderBy("created","desc") //we already pushed in a created field, in paymetn.js
            .onSnapshot(snapshot => {
            //.docs means returning it as documents
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
            <h1>Your Order History</h1>
            <div className="orders__order">
            { orders?.map((order,i) => {
               return ( <Order key={i} order={order}/>)
            })
            }
            </div>
        </div>
    )
}

// function mapStateToProps(state){

//     return{

//         basket: state.basket,
//         user: state.user

//     }

// }

// export default connect(mapStateToProps)(Orders)
export default Orders
