import axios from "axios"

const baseURL = "https://us-central1-challenge-b6352.cloudfunctions.net/api"
// const baseURL = "http://localhost:5001/challenge-b6352/us-central1/api"


const instance = axios.create({

    baseURL: baseURL //api cloud function

})

export default instance