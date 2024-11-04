import axios from "axios";
import { store } from "../../redux/store";
import { setProfile, setToken } from "../../redux/slices/user";
import { ChangeToken, Logout, endpoints } from "./Endpoint";
import { toast } from "react-toastify";


const Axios = axios.create({
  baseURL: `${import.meta.env.VITE_MAIN_BASE_URL}/api/v1/user`,
  headers: {
    'Content-Type': 'application/json'
  }
})

Axios.interceptors.request.use(function (config) {
  const token = store.getState().user.token
  config.headers.Authorization = token
  if (config.url === endpoints.fileUpload || config.url === endpoints.storyUpload) {
    config.baseURL = `${import.meta.env.VITE_UPLOAD_BASE_URL}/api/v1/user`
    config.headers["Content-Type"] = 'multipart/form-data'
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

Axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  const errorData = error.response
  if (errorData.status === Logout) {
    store.dispatch(setToken(null))
    store.dispatch(setProfile(null))
    localStorage.removeItem('token')
    localStorage.removeItem('profile')
    toast.error('Account has another login activity')
    // return Promise.reject(errorData)
  } else if (errorData.status === ChangeToken && errorData.data.data) {
    const token = errorData.data.data.token
    store.dispatch(setToken(token))
    localStorage.setItem('token', token)
    // recursive call with same config and data
    const originalRequest = errorData.config;
    originalRequest.headers.Authorization = token
    return Axios(originalRequest)
  } else {
    return Promise.reject(errorData)
  }
})


export default Axios