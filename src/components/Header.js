import React, { useEffect, useState } from 'react'
import '../css/Header.css'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { auth } from "../firebase"

const Header = () => {

    const { basket, user, userGeoLocation } = useSelector(state => state.cart)
    const [ basketLength, setBasketLenth ] = useState(basket.length)
    const [ geoLocation, setGeolocation ] = useState({
        location: "",
    })
  
    useEffect(() => 

        setBasketLenth(basket.length)
        // console.log('user ',user)

    ,[basket])

    useEffect(() => {
    
        if(userGeoLocation?.location.length)
        {
            setGeolocation({...userGeoLocation, location: userGeoLocation.location})
            // console.log("geo location ", geoLocation);   
        }
  
            
    },[userGeoLocation])

    const handleAuthentication = () => {

        if(user)
        {
            auth.signOut()
            // console.log("user ",user)
        }

    }
    // console.log("geolocation ", geoLocation)
    const { location } = geoLocation
    return (

        <div className="header">
            <div className='header__img__geolocation__container'>
                <NavLink to="/">
                    <img 
                        className="header__logo"
                        // src="http://pngimg.com/uploads/amazon/amazon_PNT11.png"
                        src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                        alt=""
                    />
                </NavLink>
                { location?
                ( 
                    
                    <div className="header__geoLocation">
                        {/* <p>{geoLocation}</p> */}
                        <span className="header__geoLocation__deliver">
                            Deliver to
                        </span>
                        <span className="header__geoLocation__city">
                            {location[0]}
                        </span>
                        <span className="header__geoLocation__country">
                            {location[1]}
                        </span>           
                    </div>
                    
                    )
                    :
                    ""
                }
            </div>
             <div className="header__search">
                 <input 
                    className="header__searchInput"  
                    type="text" 
                />
                <SearchIcon className="header__searchIcon" />
            </div>
            <div className="header__nav">
                {/* original code had to={ !user && "/login"}  which stuffed me up for ages can aslo do user? "" : "/login" will do the same as below link*/}
                <NavLink to={ !user? "/login" : "" }>
                    <div className="header__option" onClick={handleAuthentication}>
                        <span className="header__optionLineOne">Hello { user?.displayName? user.displayName : user? user.email : "Guest"}</span>
                        <span className="header__optionLineTwo">{user? "Sign out":"Sign in"}
                        </span>
                    </div>
                </NavLink>
                <NavLink to="/orders">
                    <div className="header__option">
                        <span className="header__optionLineOne">Returns</span>
                        <span className="header__optionLineTwo">& Orders</span>
                    </div>
                </NavLink>
                <div className="header__option">    
                    <span className="header__optionLineOne">Your</span>
                    <span className="header__optionLineTwo">Prime</span> 
                </div>
                <NavLink to="/checkout">
                    <div className="header__optionBasket"> 
                        <ShoppingBasketIcon />
                        <span className="header__optionLineTwo header__basketCount">{basketLength}</span>
                        {/* <span className="header__optionLineOn"></span> */}
                    </div>
                </NavLink>
            </div>
        </div>
        
    )
}
 
export default Header
