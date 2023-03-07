import { useState } from "react"
import { MdArrowDropDown, MdHome, MdPeople, MdPerson, MdPhotoLibrary, MdReorder, MdRestaurantMenu, MdSettings } from "react-icons/md"
import Navigation from "./Navigation"

export default function SideBar({ show, onNavigate }) {
    const [menus, setMenus] = useState([
        {
            link: "/admin",
            name: "Dashboard",
            icon: <MdHome size={24} />
        },
        {
            link: "/admin/sliders",
            name: "Slider",
            icon: <MdPhotoLibrary size={24} />,
            showSubMenus: false,
            subMenus: [
                {
                    link: "/admin/sliders/create",
                    name: "Create New"
                },
                {
                    link: "/admin/sliders",
                    name: "List All"
                },
            ]
        },
        {
            link: "/admin/categories",
            name: "Category",
            icon: <MdReorder size={24} />,
            showSubMenus: false,
            subMenus: [
                {
                    link: "/admin/categories/create",
                    name: "Create New"
                },
                {
                    link: "/admin/categories",
                    name: "List All"
                },
            ]
        },
        {
            link: "/admin/foods",
            name: "Food",
            icon: <MdRestaurantMenu size={24} />,
            showSubMenus: false,
            subMenus: [
                {
                    link: "/admin/foods/create",
                    name: "Create New"
                },
                {
                    link: "/admin/foods",
                    name: "List All"
                }
            ]
        },
        {
            link: "/admin/delivery-agents",
            name: "Delivery Agent",
            icon: <MdPerson size={24} />,
            showSubMenus: false,
            subMenus: [
                {
                    link: "/admin/delivery-agents/create",
                    name: "Create New"
                },
                {
                    link: "/admin/delivery-agents",
                    name: "List All"
                }
            ]
        },
        {
            link: "/admin/orders",
            name: "Orders",
            icon: <MdReorder size={24} />
        },
        {
            link: "/admin/customers",
            name: "Customers",
            icon: <MdPeople size={24} />
        },
        {
            link: "/admin/settings",
            name: "Settings",
            icon: <MdSettings size={24} />
        }
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
                        activeClass="sidebar-nav-link-active"
                        key={index}
                    >
                        {menu.icon}
                        <div className="sidebar-right-container">
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
