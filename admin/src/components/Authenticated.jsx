import { useContext } from "react"
import { Outlet, useLocation, useSearchParams } from "react-router-dom"
import { toast } from "react-toastify"
import { SITE_URL } from "../utils/constants"
import { AuthContext } from "./Auth"

export default function Authenticated() {
    const { currentUser } = useContext(AuthContext)

    const [searchParams] = useSearchParams()

    const navigator = useLocation()

    let path = navigator.pathname + "?"

    searchParams.forEach((value, key) => path += `${key}=${value}`)

    path = `${SITE_URL}?returnUrl=${path}`

    return currentUser ? <Outlet /> : toast.error("Please login")
}