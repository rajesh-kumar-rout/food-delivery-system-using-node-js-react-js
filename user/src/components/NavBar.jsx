import axios from "axios"
import { useContext, useState } from "react"
import { MdArrowDropDown, MdClose, MdLogin, MdMenu, MdOutlineEdit, MdOutlineHome, MdOutlineLogout, MdOutlinePerson, MdOutlineRestaurantMenu, MdOutlineShoppingCart, MdOutlineTask, MdPersonAdd, MdSearch } from "react-icons/md"
import { Link } from "react-router-dom"
import { AuthContext } from "./Auth"
import { Navigation } from "./Navigation"

export default function NavBar() {
    const { currentUser } = useContext(AuthContext)

    const [isDropDownOpened, setIsDropDownOpened] = useState(false)
    const [isMenuOpened, setIsMenuOpened] = useState(false)

    const handleMenuClick = (event) => {
        event.preventDefault()
        event.stopPropagation()
        setIsDropDownOpened(true)
    }

    const handleLinkClick = (event) => {
        setIsMenuOpened(false)
    }

    const handleLogout = async(event) => {
        event.preventDefault()

        localStorage.removeItem("authToken")

        window.location.href = "/"
    }

    window.onclick = () => {
        isDropDownOpened && setIsDropDownOpened(false)
    }

    return (
        <nav className="navbar">
            <div className="navbar-container">

                <Link to="/" className="navbar-title">
                    <MdOutlineRestaurantMenu size={24} />
                    <span>Foodie</span>
                </Link>

                <ul className="navbar-menu" data-opened={isMenuOpened}>
                    <li>
                        <Navigation 
                            activeClass="navbar-link-active" 
                            className="navbar-link" 
                            to="/" 
                            onClick={handleLinkClick}
                        >
                            <MdOutlineHome size={24} />
                            <span>Home</span>
                        </Navigation>
                    </li>

                    <li>
                        <Navigation 
                            activeClass="navbar-link-active" 
                            className="navbar-link" 
                            to="/search" 
                            onClick={handleLinkClick}
                        >
                            <MdSearch size={24} />
                            <span>Search</span>
                        </Navigation>
                    </li>

                    <li>
                        <Navigation 
                            activeClass="navbar-link-active" 
                            className="navbar-link" 
                            to="/cart" 
                            onClick={handleLinkClick}
                        >
                            <MdOutlineShoppingCart size={24} />
                            <span>Cart</span>
                        </Navigation>
                    </li>

                    <li className="relative">
                        <Navigation 
                            activeClass="navbar-link-active" 
                            className="navbar-link" 
                            to="/auth" 
                            onClick={handleMenuClick}
                        >
                            <MdOutlinePerson size={24} />
                            <span>Account</span>
                            <MdArrowDropDown size={24} />
                        </Navigation>

                        <ul className="navbar-dropdown" data-opened={isDropDownOpened}>
                            {currentUser ? (
                                <>
                                    <li>
                                        <Navigation 
                                            onClick={handleLinkClick} 
                                            className="navbar-dropdown-link" 
                                            to="/auth/orders"
                                        >
                                            <MdOutlineTask size={24} />
                                            <span>My Orders</span>
                                        </Navigation>
                                    </li>

                                    <li>
                                        <Navigation 
                                            onClick={handleLinkClick} 
                                            activeClass="navbar-dropdown-link-active" 
                                            className="navbar-dropdown-link" 
                                            to="/auth/edit-profile"
                                        >
                                            <MdOutlineEdit size={24} />
                                            <span>Edit Profile</span>
                                        </Navigation>
                                    </li>

                                    <li>
                                        <Link className="navbar-dropdown-link" onClick={handleLogout}>
                                            <MdOutlineLogout size={24} />
                                            <span>Logout</span>
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Navigation 
                                            onClick={handleLinkClick} 
                                            className="navbar-dropdown-link" 
                                            to="/auth/register"
                                        >
                                            <MdPersonAdd size={24} />
                                            <span>Register</span>
                                        </Navigation>
                                    </li>

                                    <li>
                                        <Navigation 
                                            onClick={handleLinkClick} 
                                            activeClass="navbar-dropdown-link-active" 
                                            className="navbar-dropdown-link" 
                                            to="/auth/login"
                                        >
                                            <MdLogin size={24} />
                                            <span>Login</span>
                                        </Navigation>
                                    </li>
                                </>
                            )}
                        </ul>
                    </li>
                </ul>

                {isMenuOpened ? (
                    <button className="navbar-ham-menu" onClick={() => setIsMenuOpened(false)}>
                        <MdClose size={24} />
                    </button>
                ) : (
                    <button className="navbar-ham-menu" onClick={() => setIsMenuOpened(true)}>
                        <MdMenu size={24} />
                    </button>
                )}
            </div>
        </nav>
    )
}
