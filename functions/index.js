const functions = require("firebase-functions");
const express = require("express")
const cors = require("cors");
const stripe = require('stripe')('sk_test_51JrBJFCeBeR4kdgiouDqGImQDA4t8dK0OZmkDv4akDpD4XKbl6dQgGTZ5JED7GAKletkDgnpu6dNcNkUoB7e3iW700n6BvgevJ')

//API


//API config
const app = express()


//Middlewares
// app.use(cors({origin: true}))
//origin is the local host you are allowing to cross realm
app.use(cors({origin: "http://localhost:3000"}))
app.use(express.json())


//API routes
app.get("/",(req,res) => {
    res.status(200).send("hello world")
})

// var cors = require('cors');    
// app.use(cors({credentials: true, origin: 'http://localhost:5000'}));

app.post("/payment/create", async (req,res) => {

    
    //in payments component   url: `/payments/create?total=${totalPrice}`
    const total = Number(req.query.total)

    console.log("Payment Request Recieved amount is >>> ", total)

    //the amount cant be decimals, it is x100 in payment.js from client side, it receives in cents
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, //subunits of currency
        currency: "nzd",
    })

    console.log("paymentIntent >>>>>> ",paymentIntent)
    // OK - created
    res.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })

   
})


//Listen command
//got its api name as exports.api
exports.api = functions.https.onRequest(app)


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
