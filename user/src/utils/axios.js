import axios from "axios"

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL

axios.interceptors.request.use(config => {

    if (localStorage.getItem("authToken")) {
        config.headers.authorization = `Bearer ${localStorage.getItem("authToken")}`
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