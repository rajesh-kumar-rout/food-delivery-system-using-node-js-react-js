import { Link } from "react-router-dom"
import { useState } from "react"
import QtyControl from "components/QtyControl"
import axios from "utils/axios"

const cart = [
    {
        name: "Black Gold Dumpling Noodles",
        price: 456,
        qty: 3,
        imgUrl: "https://res.cloudinary.com/dhyc0vsbz/image/upload/v1669736349/cwtenlmg6ngxajkqsqog.jpg"
    },
    {
        name: "Keema masala noodles",
        price: 678,
        qty: 1,
        imgUrl: "https://res.cloudinary.com/dhyc0vsbz/image/upload/v1669736349/cwtenlmg6ngxajkqsqog.jpg"
    },
    {
        name: "Paneer Mirch Masala Birrito",
        price: 789,
        qty: 2,
        imgUrl: "https://res.cloudinary.com/dhyc0vsbz/image/upload/v1669736396/agw17rwvia2ol1eo4izj.jpg"
    },
]

export default function CartPage() {
    const [cartItems, setCartItems] = useState(cart)
    const [isFetching, setIsFetching] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const [pricingDetails, setPricingDetails] = useState({})

    const fetchData = async () => {
        const { data } = await axios.get("/cart")
        setIsFetching(data.cartItems)
        setPricingDetails(data.pricingDetails)
        setIsFetching(false)
    }

    const handleQuantityChange = async (itemId, quantity) => {
        setIsLoading(true)
        await axios.patch(`/cart/${itemId}`, { quantity })
        setIsLoading(false)
    }

    const handleRemoveItem = async (itemId) => {
        setIsLoading(true)
        await axios.delete(`/cart/${itemId}`)
        setIsLoading(false)
    }

    return (
        <div className="cart">
            <div className="card">
                <div className="card-header card-title">Cart Items</div>
                <div className="card-body" >
                    {cartItems.map(cartItem => (
                        <div className="cart-item">
                            <img className="cart-item-img" src={cartItem.imgUrl} />
                            <div className="cart-item-right">
                                <p className="cart-item-name">{cartItem.name}</p>
                                <p className="cart-item-price">Rs. {cartItem.price}</p>
                                <div className="cart-item-footer">
                                    <QtyControl quantity={cartItem.qty} />
                                    <button className="btn btn-primary btn-sm">Remove</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="card">
                <p className="card-header card-title">Pricing Details</p>

                <div className="card-body">
                    <div className="pricing">
                        <p>Total Price</p>
                        <p>Rs. 56</p>
                    </div>
                    <div className="pricing">
                        <p>Delivery Fee</p>
                        <p>Rs. 78</p>
                    </div>
                    <div className="pricing">
                        <p>Gst(7%)</p>
                        <p>Rs. 78</p>
                    </div>
                    <div className="pricing pricing-last-item">
                        <p>Total Payable</p>
                        <p>Rs. 234</p>
                    </div>
                </div>

                <div className="card-footer">
                    <Link to="/checkout" className="btn btn-primary btn-full">Checkout</Link>
                </div>
            </div>
        </div>
    )
}