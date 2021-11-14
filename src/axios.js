import axios from "axios"

// const baseURL = "http://localhost:5001/challenge-b6352/us-central1/api"
const baseURL = "https://us-central1-khos-17ce8.cloudfunctions.net/api"
// const baseURL = "http://127.0.0.1:5001/khos-17ce8/us-central1/api"


const instance = axios.create({

    baseURL: baseURL //api cloud function

})

export default instance