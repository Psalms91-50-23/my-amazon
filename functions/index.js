const functions = require("firebase-functions");
const express = require("express")
const cors = require("cors");
require('dotenv').config()


const stripe = require('stripe')(process.env.REACT_APP_API)

//API

//API config
const app = express()


//Middlewares

app.use(cors({origin: "https://khos-17ce8.web.app" })) //live for deployment
// app.use(cors({origin: "http://localhost:3000"})) //for local testing


app.use(express.json())


//API routes
app.get("/",(req,res) => {
    res.status(200).send("hello world")
})


app.post("/payment/create", async (req,res) => {

    
    //in payments component   url: `/payments/create?total=${totalPrice}`
    const total = Number(req.query.total)

    // console.log("Payment Request Recieved amount is >>> ", total)

    //the amount cant be decimals, it is x100 in payment.js from client side, it receives in cents
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, //subunits of currency
        currency: "nzd",
    })

    // console.log("paymentIntent >>>>>> ",paymentIntent)
    // OK - created
    res.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })

   
})


//Listen command
//got its api name as exports.api
exports.api = functions.https.onRequest(app)

