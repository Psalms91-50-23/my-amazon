import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, setGeoLocation } from './actions/basketAction';
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
import Geocode from "react-geocode";
require('dotenv').config()
const promise = loadStripe("pk_test_51JrBJFCeBeR4kdgii1X8OghJOo35vuMSHLEltHE7BrR5NltaIFOiTUp5aUSXT7K0OKv8gqJiJyTL6Dy6ZbPRrkg100w3dzmjVd")

function App() {

    // const { user, basket, profileName } = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const [ userCoorindates, setUserCoordinates ] = useState({
        latitude: null,
        longitude: null
    })

    useEffect(() => {
   
        getGeoLocation()

    },[])

    useEffect(() => {
   
        if(userCoorindates.latitude)
        {
            getGeoCoordinates()  
        }
         

    },[userCoorindates.latitude])

    useEffect(() => {

        auth.onAuthStateChanged((authUser) => {
        
            
            if(authUser)
            {
                
                dispatch(setUser(authUser))
                
            }
            else{

                dispatch(setUser(null))

            }

        })
        
    },[dispatch])

    function handleError(error){

        switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation. You can turn it off to activate re-prompting of location after you refresh")
            break;
        case error.POSITION_UNAVAILABLE:
            alert( "Location information is unavailable.")
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.")
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.")
            break;
        default:
            alert("error code: ",error.code)
        }

    }
    
    function getCoords(position){

        const { latitude, longitude } = position.coords

        if(latitude && longitude)
        {

            setUserCoordinates({ latitude, longitude })

        }
                  
    }

    
    function getGeoLocation(){
            
        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(getCoords,handleError)

            } else {

            console.error("Geolocation is not supported by this browser.")

            }
    }

    function getGeoCoordinates(){
        
        // getGeoLocation()
        Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
        if(userCoorindates.latitude)
        {
            Geocode.fromLatLng(userCoorindates.latitude, userCoorindates.longitude).then((response) => {

                    const cityCountry = response.results[9].formatted_address
                    dispatch(setGeoLocation(cityCountry))
                    
                },
                (error) => {
                    console.error(error);
                }

                ).catch(error => {
                    console.error(error);
                });
        }     
        
    }


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
