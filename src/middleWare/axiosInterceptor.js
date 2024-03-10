//axiosInterceptor.js

import axios from 'axios'
import { toast } from 'react-toastify'

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
})

api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response.status === 401) {
      // Token has expired, redirect to login page
      window.location.href = '/'
    }
    return Promise.reject(error)
  },
)

export default api
