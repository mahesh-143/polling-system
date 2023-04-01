import axios from "axios"

const client = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
})

export default client