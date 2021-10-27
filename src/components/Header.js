import React, { useEffect, useState } from 'react'
import '../css/Header.css'
// import SearchIcon from '@mui/icons-material/Search';
// import { SearchIcon } from '@mui/icons-material'
// import SearchIcon  from '@material-ui/core/SvgIcon';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Link , NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';


// import { ShoppingBasketIcon } from '@material-ui/icons';

const Header = () => {

    const basket = useSelector(state => state.cart.basket)
    const [ basketLength, setBasketLenth ] = useState(basket.length)
 

useEffect(() => {

    setBasketLenth(basket.length)

},[basket])

    return (
        <div className="header">
            <Link to="/">
                <img 
                    className="header__logo"
                    // src="http://pngimg.com/uploads/amazon/amazon_PNT11.png"
                    src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                />
            </Link>
             <div className="header__search">
                 <input 
                    className="header__searchInput"  
                    type="text" 
                />
                <SearchIcon className="header__searchIcon" />
            </div>
            <div className="header__nav">
                <NavLink to="/login">
                    <div className="header__option">
                        <span className="header__optionLineOne">Hello Guest</span>
                        <span className="header__optionLineTwo">Sign in</span>
                    </div>
                </NavLink>
                <div className="header__option">
                    <span className="header__optionLineOne">Returns</span>
                    <span className="header__optionLineTwo">& Orders</span>
                 </div>
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
