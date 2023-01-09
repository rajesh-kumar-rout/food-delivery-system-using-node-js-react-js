import { toast } from "react-toastify"
import { BASE_URL } from "./constants"

const callNetwork = async (currentUrl, headers = {}, method, body) => {

    if (localStorage.getItem("authToken")) {
        headers.authorization = `Bearer ${localStorage.getItem("authToken")}`
    }

    if (!(body instanceof FormData)) {
        headers["Content-Type"] = "application/json"
        body = JSON.stringify(body)
    }

    try {

        const response = await fetch(`${BASE_URL}${currentUrl}`, {
            method,
            headers,
            body
        })

        if (response.status === 401) {
            localStorage.removeItem("authToken")
            window.location.href = "/login"
        }

        if (response.status === 500) {
            toast.error("500 - Internal server error")
        }

        const data = response.headers.get("Content-Type")?.includes("application/json") ? await response.json() : null

        return {
            status: response.status,
            headers: response.headers,
            statusText: data?.statusText ? data.statusText : null,
            data: data
        }

    } catch {

        toast.error(window.navigator.onLine ? "Unknown error occur" : "Check your network connection")

        return {
            status: null,
            headers: null,
            statusText: window.navigator.onLine ? "server_error" : "network_failure",
            data: null
        }
    }
}

export const getData = (url, headers) => callNetwork(url, headers, "GET")

export const postData = (url, body, headers) => callNetwork(url, headers, "POST", body)

export const patchData = (url, body, headers) => callNetwork(url, headers, "PATCH", body)

export const deleteData = (url, body, headers) => callNetwork(url, headers, "DELETE", body)