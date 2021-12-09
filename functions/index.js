const functions = require("firebase-functions");
const express = require("express")
const cors = require("cors");
require('dotenv').config()


const stripe = require('stripe')(process.env.REACT_APP_API)

//API

//API config
const app = express()

//Middlewares
var corsOptions = {
    origin: ["https://khos-17ce8.web.app","http://localhost:3000","https://khos-17ce8.firebaseapp.com"],
    optionsSuccessStatus: 200 // For legacy browser support
}
    
app.use(cors(corsOptions));
// app.use(cors({origin: "https://khos-17ce8.web.app" })) //live for deployment
// app.use(cors({origin: "http://localhost:3000"})) //for local testing
app.use(express.json())

// app.use((req,res,next) => {
//     res.header("Access-Control-Allow-Origin", corsOptions)
//     res.header("Access-Control-Allow-Headers", "Origin,, X-Requested-With, Content-Type, Accept")
//     next()

// })
//API routes
app.get("/",(req,res) => {
    res.status(200).send("hello world")
})

app.post("/payment/create", async (req,res) => {

    //in payments component   url: `/payments/create?total=${totalPrice*100}`
    const total = Number(req.query.total)

    //the amount cant be decimals, it is x100 in payment.js from client side, it receives in cents
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, //subunits of currency
        currency: "nzd",
    })

    // console.log("paymentIntent  ",paymentIntent)
    // OK - created
    res.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })

   
})


//Listen command
//got its api name as exports.api
// "http://127.0.0.1:5001/khos-17ce8/us-central1/api" gets its api at the end
exports.api = functions.https.onRequest(app)

