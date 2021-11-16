import axios from "axios"

//live url firebase endpoint
const baseURL = "https://us-central1-khos-17ce8.cloudfunctions.net/api" //? 
// "https://us-central1-khos-17ce8.cloudfunctions.net/api" : "http://127.0.0.1:5001/khos-17ce8/us-central1/api"

//local endpoints
// const baseURL = "http://127.0.0.1:5001/khos-17ce8/us-central1/api"  //for local testing


const instance = axios.create({

    baseURL: baseURL //api cloud function

})

export default instance