import { useContext } from "react"
import { toast } from "react-toastify"
import { AuthContext } from "./Auth"

export default function Button(props) {
    const { currentUser } = useContext(AuthContext)

    const { onClick, errorText, authenticated, ...others } = props

    return (
        <button
            {...others}
            onClick={() => authenticated ? (currentUser ? onClick() : toast.error(errorText ? errorText : "Please login to perform this action")) : onClick()}
        >
            {props.children}
        </button>
    )
}