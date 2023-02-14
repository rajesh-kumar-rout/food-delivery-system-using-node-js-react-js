import axios from "axios"
import { createContext, useEffect, useState } from "react"
import Loader from "./Loader"

export const AuthContext = createContext()

export default function Auth({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [isLoading, setIsLoading] = useState(true)

    const fetchCurrentUser = async () => {
        const { data } = await axios.get(process.env.REACT_APP_BASE_URL + "/auth")

        setCurrentUser(data?.isAdmin && data)

        setIsLoading(false)
    }

    useEffect(() => {
        fetchCurrentUser()
    }, [])

    if (isLoading) {
        return <Loader/>
    }

    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </AuthContext.Provider>
    )
}

