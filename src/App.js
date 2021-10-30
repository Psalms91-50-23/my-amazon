import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setUser } from './actions/basketAction';
import './App.css';
import Header from '../src/components/Header';
import Home from '../src/components/Home';
import Checkout from '../src/components/Checkout';
import Login from './components/Login';
import { Route, BrowserRouter  } from 'react-router-dom'
import { auth } from "./firebase"

function App() {

    const { user,basket } = useSelector(state => state.cart)
    const dispatch = useDispatch()

    useEffect(() => {

      
            auth.onAuthStateChanged((authUser) => {
                console.log("the user is ===> ", authUser)
    
                if(authUser)
                {
                    dispatch(setUser(authUser))
    
                }else{
                    
                    dispatch(setUser(null))
                }
    
            })
        
    },[])

  return (
      
 
      <div className="app">
        {/* <Route path="/" component={Header}/> */}
        <Route exact path="/">
            <Header />
            <Home />
        </Route>
        <Route path="/checkout">
            <Header />
            <Checkout />
        </Route>
        {/* <Route path="/options">
            <h1>check me out my options</h1>
        </Route> */}
        <Route path="/login" component={Login} />
      </div>
 
    
  );
}

export default App;
