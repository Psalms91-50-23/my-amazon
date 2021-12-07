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
    const [ userLocationDetails, setUserLocationDetails ] = useState({
        latitude: null,
        longitude: null,
        userCityCountry: null
    })

    useEffect(() => {

       
        const handleError = (error) => {

            switch(error.code) {
            case error.PERMISSION_DENIED:
                alert("User denied the request for Geolocation.")
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
        
        const getCoords = (position) => {
            // console.log("position ", position.coords);
            const { latitude, longitude } = position.coords
            // console.log("lat ",latitude, " longitude ", longitude);
            if(latitude && longitude)
            {
                setUserLocationDetails({ ...userLocationDetails, latitude, longitude })
                // console.log("user location state ", userLocationDetails);
            }
            
            
        }
        
        const getGeoLocation =  ()=> {
            
            if (navigator.geolocation) {
                // console.log("geolocation Object ", navigator)
                navigator.geolocation.getCurrentPosition(getCoords,handleError);
                } else {
                console.error("Geolocation is not supported by this browser.");
                }
        }
        
        getGeoLocation()
        const { latitude, longitude, userCityCountry } = userLocationDetails
        Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
        if(latitude)
        {
            Geocode.fromLatLng(latitude, longitude).then((response) => {
                    // console.log("res ",response);
                    const cityCountry = response.results[9].formatted_address
                    setUserLocationDetails({ ...userLocationDetails, userCityCountry: cityCountry })
                    dispatch(setGeoLocation(cityCountry))
                    // console.log("city and country ", cityCountry)
                },
                (error) => {
                    console.error(error);
                }

                ).catch(error => {
                    console.error(error);
                });
        }     

    },[userLocationDetails.latitude, userLocationDetails.userCityCountry])

    useEffect(() => {

        auth.onAuthStateChanged((authUser) => {
        
            
            if(authUser)
            {
                
                // const userProfile = {...authUser, displayName: profileName }
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
