import { createContext, useEffect, useState } from "react"
import axios from "../utils/axios"
import Loader from "./Loader"

export const AuthContext = createContext()

export default function Auth({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [isLoading, setIsLoading] = useState(true)

    const fetchCurrentUser = async () => {
        const { data } = await axios.get("/auth")
        setCurrentUser(data)
        setIsLoading(false)
    }

    useEffect(() => {
        fetchCurrentUser()
    }, [])

    if (isLoading) {
        return (
            <div className="h-screen">
                <Loader/>
            </div>
        )
    }

    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </AuthContext.Provider>
    )
}

