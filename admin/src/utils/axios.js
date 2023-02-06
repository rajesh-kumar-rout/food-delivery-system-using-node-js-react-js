import axios from "axios"
import { ADMIN_URL } from "./constants"

axios.defaults.baseURL = ADMIN_URL

axios.interceptors.request.use(config => {

    if (localStorage.getItem("authToken")) {
        config.headers.authorization = localStorage.getItem("authToken")
    }

    return config

}, error => Promise.reject(error))

axios.interceptors.response.use(response => response, error => {

    if (error.response.status === 401) {

        localStorage.removeItem("authToken")

        window.location.href = "/login"
    }
    return Promise.reject(error)
})

export default axios