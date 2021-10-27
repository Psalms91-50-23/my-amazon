import React from 'react'
import '../css/Home.css'
import Product from './Product'

const Home = () => {

    return (

        <div className="home">
            <div className="home__container">
                {/* <img src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE_XSite_1500x600_PV_en-GB._CB428684220_.jpg" alt="" /> */}
                <img className="home__image" src="https://m.media-amazon.com/images/I/61ASx7NHTWL._SX3000_.jpg" alt="" />
            </div>

            <div className="home__row">
                <Product itemId={1111} title="Virtual reality" price={29.99} image="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2021/June/Fuji_Dash_Oculus_1x._SY304_CB667158353_.jpg" rating={2}/>

                <Product itemId={1232} title="Rice cooker" price={29.99} image="https://m.media-amazon.com/images/I/71WtwEvYDOS._AC_SY200_.jpg" rating={3}/>

                <Product itemId={5454} title="Dream Television" price={29.99} image="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_PC_1x._SY304_CB431800965_.jpg" rating={4}/>

                <Product itemId={4324} title="Virtual reality" price={12.95} image="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2021/June/Fuji_Dash_Oculus_1x._SY304_CB667158353_.jpg" rating={2}/>

                <Product itemId={5123} title="Rice cooker" price={29.99} image="https://m.media-amazon.com/images/I/71WtwEvYDOS._AC_SY200_.jpg" rating={3}/>

                <Product itemId={1542} title="HD Computer Screen" price={500.00} image="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_PC_1x._SY304_CB431800965_.jpg" rating={4}/>     
              
            </div>

            <div className="home__row">
                {/* <Product itemId={5123} title="Rice cooker" price={29.99} image="https://m.media-amazon.com/images/I/71WtwEvYDOS._AC_SY200_.jpg" rating={3}/>

                <Product itemId={1542} title="HD Computer Screen" price={500.00} image="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_PC_1x._SY304_CB431800965_.jpg" rating={4}/>  

                <Product itemId={5123} title="Rice cooker" price={29.99} image="https://m.media-amazon.com/images/I/71WtwEvYDOS._AC_SY200_.jpg" rating={3}/>

                <Product itemId={1542} title="HD Computer Screen" price={500.00} image="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_PC_1x._SY304_CB431800965_.jpg" rating={4}/>      */}
                {/* product component  */}
                {/* product component  */}
                {/* product component  */}
            </div>

            <div className="home__row">
                {/* product component  */}
               
            </div>

        </div>
    )
}

export default Home
