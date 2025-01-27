import { envs } from '@/config/envs'
import axios from 'axios'

/**
 * Axios instance configured for API communication
 * @remarks
 * This instance is pre-configured with the base URL from environment variables
 * and can be used across the application for making HTTP requests
 * to the backend services.
 *
 * @see {@link axios.create}
 */
const api = axios.create({ baseURL: envs.apiUrl })

api.interceptors.request.use((config) => {
  // get token from local storage
  const token = localStorage.getItem('token')

  // if token exists, add it to the headers
  if (token) config.headers.Authorization = `Bearer ${token}`

  // return the config
  return config
})

export { api }
