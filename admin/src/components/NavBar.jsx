import { MdMenu } from "react-icons/md"

export default function NavBar({ onMenuClick }) {
    return (
        <div className="navbar">
            <button className="navbar-menu-btn" onClick={onMenuClick}>
                <MdMenu size={28} />
            </button>
            <h1 className="navbar-title">FOODIE ADMIN</h1>
        </div>
    )
}