import React from 'react'
import '../css/Home.css'
import Product from './Product'

const Home = () => {

    return (

        <div className="home">
            <div className="home__container">
                {/* <img src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE_XSite_1500x600_PV_en-GB._CB428684220_.jpg" alt="" /> */}
                <img className="home__image" src="https://m.media-amazon.com/images/I/61ASx7NHTWL._SX3000_.jpg" alt="" />
                {/* <ImageSlider /> */}
            </div>
            <div className="home__row">
                <Product 
                    itemId={1111} 
                    title="Oculus Virtual reality v2" 
                    price={159.99} 
                    image="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2021/June/Fuji_Dash_Oculus_1x._SY304_CB667158353_.jpg" 
                    rating={4}
                />

                <Product 
                    itemId={1232} 
                    title="Rice cooker" 
                    price={29.99} 
                    image="https://m.media-amazon.com/images/I/71WtwEvYDOS._AC_SY200_.jpg" 
                    rating={3}
                />
          
            </div>
            <div className="home__row__middle">

                <Product 
                    itemId={5454}
                    title="Macbook Air 13 inch" 
                    price={1799.99} 
                    image="https://m.media-amazon.com/images/I/71vFKBpKakL._AC_UY327_QL65_.jpg" 
                    rating={4}
                 />

                <Product 
                    itemId={4324} 
                    title="The Lean Startup: How Constant Innovation Creates Radically Successful Businesses Paperback" 
                    price={11.96} 
                    image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX325_BO1,204,203,200_.jpg" 
                    rating={3}
                />

                <Product 
                    itemId={5123} 
                    title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor - Super Ultra Wide Dual WQHD 5120 x 1440" 
                    price={1094.98} 
                    image="https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SX355_.jpg" 
                    rating={3}
                />

                <Product 
                    itemId={1542} 
                    title="HD Computer Screen" 
                    price={500.00} 
                    image="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_PC_1x._SY304_CB431800965_.jpg" 
                    rating={4}
                />

            </div>
            <div className="home__row__bottom">
         
                <Product
                    itemId="4903850"
                    title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor"
                    price={199.99}
                    rating={3}
                    image="https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466_.jpg"
                />
                <Product
                    itemId="23445930"
                    title="Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric"
                    price={98.99}
                    rating={5}
                    image="https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobilex2$"
                />
                <Product
                    itemId="3254354345"
                    title="New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)"
                    price={598.99}
                    rating={4}
                    image="https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX385_.jpg"
                />
               
            </div>
        </div>
    )
}

export default Home
