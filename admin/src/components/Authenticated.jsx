import { useContext } from "react"
import { Outlet } from "react-router-dom"
import { toast } from "react-toastify"
import { AuthContext } from "./Auth"

export default function Authenticated() {
    const { currentUser } = useContext(AuthContext)

    return currentUser ? <Outlet /> : toast.error("Please login")
}