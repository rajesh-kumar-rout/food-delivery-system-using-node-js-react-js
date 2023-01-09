import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext()

export default function AuthContextProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(null)

    const initAuthStatus = () => {
        if (localStorage.getItem("authToken")) {
            setIsAuthenticated(true)
        } else {
            setIsAuthenticated(false)
        }
    }

    useEffect(() => {
        initAuthStatus()
    }, [])

    if (isAuthenticated === null) {
        return
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)
