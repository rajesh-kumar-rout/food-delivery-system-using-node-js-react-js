import { Navigate, Outlet } from "react-router-dom"
import { useAuthContext } from "../contexts/AuthContextProvider"

export function NotAuthenticated() {
    const { isAuthenticated } = useAuthContext()

    return isAuthenticated ? <Navigate to="/" replace={true} /> : <Outlet />
}

export function Authenticated() {
    const { isAuthenticated } = useAuthContext()

    return isAuthenticated ? <Outlet/> : <Navigate to="/auth/login" replace={true} />
}