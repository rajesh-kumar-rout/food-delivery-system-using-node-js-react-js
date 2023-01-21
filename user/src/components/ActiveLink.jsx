import { NavLink } from "react-router-dom"

export function ActiveLink({ to, activeClass, className, children, ...others }) {
    return (
        <NavLink {...others} to={to} className={({ isActive }) => `${className} ${isActive ? activeClass : ''}`}>
            {children}
        </NavLink>
    )
}