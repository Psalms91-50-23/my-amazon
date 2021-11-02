import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from './actions/basketAction';
import './App.css';
import Header from '../src/components/Header';
import Home from '../src/components/Home';
import Checkout from '../src/components/Checkout';
import Login from './components/Login';
import { Route  } from 'react-router-dom'
import { auth } from "./firebase"
import Payment from './components/Payment';
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from '@stripe/react-stripe-js';



function App() {

    const { user, basket, profileName } = useSelector(state => state.cart)
    const dispatch = useDispatch()

    if('geolocation' in navigator) {
        /* geolocation is available */
        // console.log("geoLocation available")
    } else {
        /* geolocation IS NOT available */
        // console.log("geoLocation not available")
      }
      

    useEffect(() => {

            auth.onAuthStateChanged((authUser) => {
            
                
                if(authUser && profileName)
                {
                    
                    const userProfile = {...authUser, displayName: profileName }
                    dispatch(setUser(userProfile))
                 
                }else if(authUser){
                    
                
                    dispatch(setUser(authUser))
                }
                else{
                    dispatch(setUser(null))
                }
    
            })
        
    },[profileName])

  return (
      
      <div className="app">
        <Route exact path="/">
            <Header />
            <Home />
        </Route>
        <Route path="/checkout">
            <Header />
            <Checkout />
        </Route>
        <Route path="/payment">
            <Header />
            <Payment />
        </Route>
        <Route path="/login" component={Login} />
      </div>
    
  );
}

export default App;
