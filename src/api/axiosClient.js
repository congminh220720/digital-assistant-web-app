import axios from 'axios'
import jwtDecode from 'jwt-decode'
import queryString from 'query-string'
import { getUserToken } from '../utils/localData'

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: params => queryString.stringify(params), // paramsSerializer??
})

axiosClient.interceptors.request.use(async config => {
  const token = getUserToken()
  if (token) {
    config.baseURL = process.env.REACT_APP_API_URL_DEBUG
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

axiosClient.interceptors.response.use(
  response => {
    // interceptors.response.use ??
    if (response && response.data) {
      return response.data
    }

    return response
  },
  error => {
    // Handle errors
    throw error
  },
)

export default axiosClient
