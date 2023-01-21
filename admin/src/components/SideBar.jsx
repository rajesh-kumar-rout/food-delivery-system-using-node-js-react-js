import { useState } from "react"
import { MdHome, MdRestaurantMenu, MdReorder, MdPerson, MdPhotoLibrary, MdPeople, MdArrowDropDown, MdLogout, MdSettings } from "react-icons/md"
import Navigation from "./Navigation"

export default function SideBar({ show, onNavigate }) {
    const [menus, setMenus] = useState([
        {
            link: "/",
            name: "Dashboard",
            icon: <MdHome size={24} />
        },
        {
            link: "/sliders",
            name: "Slider",
            icon: <MdPhotoLibrary size={24} />,
            showSubMenus: false,
            subMenus: [
                {
                    link: "/sliders/create",
                    name: "Create New"
                },
                {
                    link: "/sliders",
                    name: "List All"
                },
            ]
        },
        {
            link: "/categories",
            name: "Category",
            icon: <MdReorder size={24} />,
            showSubMenus: false,
            subMenus: [
                {
                    link: "/categories/create",
                    name: "Create New"
                },
                {
                    link: "/categories",
                    name: "List All"
                },
            ]
        },
        {
            link: "/foods",
            name: "Food",
            icon: <MdRestaurantMenu size={24} />,
            showSubMenus: false,
            subMenus: [
                {
                    link: "/foods/create",
                    name: "Create New"
                },
                {
                    link: "/foods",
                    name: "List All"
                }
            ]
        },
        {
            link: "/delivery-agents",
            name: "Delivery Agent",
            icon: <MdPerson size={24} />,
            showSubMenus: false,
            subMenus: [
                {
                    link: "/delivery-agents/create",
                    name: "Create New"
                },
                {
                    link: "/delivery-agents",
                    name: "List All"
                }
            ]
        },
        {
            link: "/orders",
            name: "Orders",
            icon: <MdReorder size={24} />
        },
        {
            link: "/customers",
            name: "Customers",
            icon: <MdPeople size={24} />
        },
        {
            link: "/settings",
            name: "Settings",
            icon: <MdSettings size={24} />
        },
        {
            link: "/logout",
            name: "Logout",
            icon: <MdLogout size={24} />
        },
    ])

    const handleMenuClick = (e, selectedIndex) => {
        e.preventDefault()
        setMenus(menus.map((menu, index) => ({
            ...menu,
            showSubMenus: index === selectedIndex && !menu.showSubMenus
        })))
    }

    return (
        <div className="sidebar" data-show={show}>
            {menus.map((menu, index) => (
                <>
                    <Navigation
                        to={menu.link}
                        onClick={(e) => menu.subMenus ? handleMenuClick(e, index) : onNavigate()}
                        className="sidebar-nav-link"
                        activeClass="active"
                        key={index}
                    >
                        {menu.icon}
                        <div className="sidebar-name-icon">
                            <p>{menu.name}</p>
                            {menu.subMenus && <MdArrowDropDown size={24} />}
                        </div>
                    </Navigation>

                    {menu.showSubMenus && menu.subMenus?.map((subMenu, index) => (
                        <Navigation
                            end
                            to={subMenu.link}
                            onClick={onNavigate}
                            className="sidebar-sub-link"
                            activeClass="active"
                            key={index}
                        >
                            <p>{subMenu.name}</p>
                        </Navigation>
                    ))}
                </>
            ))}
        </div>
    )
}
