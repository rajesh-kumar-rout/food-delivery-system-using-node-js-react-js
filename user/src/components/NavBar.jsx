import { useState } from "react"
import { MdSearch, MdArrowDropDown, MdOutlineHome, MdOutlineShoppingCart, MdOutlinePerson, MdOutlineRestaurantMenu, MdOutlineTask, MdOutlineEdit, MdOutlineLogout, MdOutlineLock, MdMenu, MdClose } from "react-icons/md"
import { Link } from "react-router-dom"
import { useAuthContext } from "contexts/AuthContextProvider"
import { ActiveLink } from "./ActiveLink"

export default function NavBar() {
    const { isAuthenticated } = useAuthContext()

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

    const handleLogout = (event) => {
        event.preventDefault()
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
                        <ActiveLink activeClass="navbar-link-active" className="navbar-link" to="/" onClick={handleLinkClick}>
                            <MdOutlineHome size={24} />
                            <span>Home</span>
                        </ActiveLink>
                    </li>
                    <li>
                        <ActiveLink activeClass="navbar-link-active" className="navbar-link" to="/search" onClick={handleLinkClick}>
                            <MdSearch size={24} />
                            <span>Search</span>
                        </ActiveLink>
                    </li>

                    <li>
                        <ActiveLink activeClass="navbar-link-active" className="navbar-link" to="/cart" onClick={handleLinkClick}>
                            <MdOutlineShoppingCart size={24} />
                            <span>Cart</span>
                        </ActiveLink>
                    </li>

                    <li className="relative">
                        <ActiveLink activeClass="navbar-link-active" className="navbar-link" to="/auth" onClick={handleMenuClick}>
                            <MdOutlinePerson size={24} />
                            <span>Account</span>
                            <MdArrowDropDown size={24} />
                        </ActiveLink>

                        <ul className="navbar-dropdown" data-opened={isDropDownOpened}>
                            <li>
                                <ActiveLink onClick={handleLinkClick} className="navbar-dropdown-link" to="/auth/orders">
                                    <MdOutlineTask size={24} />
                                    <span>My Orders</span>
                                </ActiveLink>
                            </li>

                            <li>
                                <ActiveLink onClick={handleLinkClick} activeClass="navbar-dropdown-link-active" className="navbar-dropdown-link" to="/auth/change-password">
                                    <MdOutlineLock size={24} />
                                    <span>Change Password</span>
                                </ActiveLink>
                            </li>

                            <li>
                                <ActiveLink onClick={handleLinkClick} activeClass="navbar-dropdown-link-active" className="navbar-dropdown-link" to="/auth/edit-account">
                                    <MdOutlineEdit size={24} />
                                    <span>Edit Account</span>
                                </ActiveLink>
                            </li>

                            <li>
                                <Link className="navbar-dropdown-link" onClick={handleLogout}>
                                    <MdOutlineLogout size={24} />
                                    <span>Logout</span>
                                </Link>
                            </li>
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
