import { COOKIE_TOKEN } from '@/database/local'
import axios from 'axios'
import Cookie from 'js-cookie'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
})

api.interceptors.request.use(
  request => {
    const token = Cookie.get(COOKIE_TOKEN)
    if (token) {
      request.headers.Authorization = `Bearer ${token}`
    }
    return request
  },
  error => Promise.reject(error)
)

api.interceptors.response.use(
  response => response,
  error => {
    if (Number(error.response?.status) === 401) {
      Cookie.remove(COOKIE_TOKEN)
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
