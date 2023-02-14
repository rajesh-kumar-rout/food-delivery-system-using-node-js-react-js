import { MdMenu } from "react-icons/md"

export default function NavBar({ onMenuClick }) {
    return (
        <div className="navbar">
            <button className="navbar-menu-btn" onClick={onMenuClick}>
                <MdMenu size={28} />
            </button>
            
            <p className="navbar-title">FOODIE ADMIN</p>
        </div>
    )
}