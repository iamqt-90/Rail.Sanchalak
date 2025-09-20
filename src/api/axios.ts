import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://api.example.com', // Replace with your API base URL
  timeout: 10000,
})

export default instance
