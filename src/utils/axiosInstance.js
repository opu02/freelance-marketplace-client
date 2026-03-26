import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://freelance-marketplace-server-teal.vercel.app'
})

export default axiosInstance