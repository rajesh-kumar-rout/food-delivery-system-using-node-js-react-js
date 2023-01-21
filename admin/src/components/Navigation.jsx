import { NavLink } from "react-router-dom"

export default function Navigation(props) {
    const { activeClass, className, ...others } = props

    return (
        <NavLink
            {...others}
            className={({ isActive }) => `${className} ${isActive ? activeClass : ""}`}
        >
            {props.children}
        </NavLink>
    )
}