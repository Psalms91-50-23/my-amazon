import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './actions/basketAction';
import './App.css';
import Header from '../src/components/Header';
import Home from '../src/components/Home';
import Checkout from '../src/components/Checkout';
import Login from './components/Login';
import Orders from './components/Orders';
import { Route  } from 'react-router-dom'
import { auth } from "./firebase"
import Payment from './components/Payment';
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from '@stripe/react-stripe-js';
require('dotenv').config()
const promise = loadStripe("pk_test_51JrBJFCeBeR4kdgii1X8OghJOo35vuMSHLEltHE7BrR5NltaIFOiTUp5aUSXT7K0OKv8gqJiJyTL6Dy6ZbPRrkg100w3dzmjVd")

function App() {

    // const { user, basket, profileName } = useSelector(state => state.cart)
    const dispatch = useDispatch()


    useEffect(() => {

            auth.onAuthStateChanged((authUser) => {
            
                
                if(authUser)
                {
                    
                    // const userProfile = {...authUser, displayName: profileName }
                    dispatch(setUser(authUser))
                 
                }else if(authUser){
                             
                    dispatch(setUser(authUser))

                }
                else{

                    dispatch(setUser(null))

                }
    
            })
        
    },[dispatch])

  return (
      
      <div className="app">
          <Route path="/" component={Header}/>
          <Route exact path="/" component={Home}/>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/payment">
            <Elements stripe={promise}>
                <Payment />
            </Elements>
          </Route>
          <Route path="/orders" component={Orders}/>
          <Route path="/login" component={Login}/>
         
      </div>
    
  );
}

export default App;
