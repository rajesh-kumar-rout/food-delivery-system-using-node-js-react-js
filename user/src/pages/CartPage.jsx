import Loader from "components/Loader"
import QtyControl from "components/QtyControl"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
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
    const [cart, setCart] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [pricing, setPricing] = useState({})

    const fetchData = async () => {
        const [cartRes, pricingRes] = await Promise.all([
            axios.get("/cart"),
            axios.get("/cart/pricing")
        ])

        setPricing(pricingRes.data)

        setCart(cartRes.data)

        setIsLoading(false)
    }

    const handleQtyChange = async (foodId, qty) => {
        setIsLoading(true)

        await axios.post("/cart", {
            foodId,
            qty
        })

        fetchData()
    }

    const handleDeleteItem = async (foodId) => {
        setIsLoading(true)

        await axios.delete(`/cart/${foodId}`)

        fetchData()
    }

    useEffect(() => {
        fetchData()
    }, [])

    if(isLoading) {
        return <Loader/>
    }

    if(cart.length === 0) {
        return <div>Your cart is empty</div>
    }

    return (
        <div className="cart">
            <div className="card">
                <div className="card-header card-title">Cart Items</div>
                <div className="card-body" >
                    {cart.map(cartItem => (
                        <div className="cart-item">
                            <img className="cart-item-img" src={cartItem.imageUrl} />
                            <div className="cart-item-right">
                                <p className="cart-item-name">{cartItem.name}</p>
                                <p className="cart-item-price">Rs. {cartItem.price}</p>
                                <div className="cart-item-footer">
                                    <QtyControl quantity={cartItem.qty} onChange={qty => handleQtyChange(cartItem.foodId, qty)} />
                                    <button className="btn btn-primary btn-sm" onClick={() => handleDeleteItem(cartItem.foodId)}>Remove</button>
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
                        <p>Food Price</p>
                        <p>Rs. {pricing.foodPrice}</p>
                    </div>
                    <div className="pricing">
                        <p>Delivery Fee</p>
                        <p>Rs. {pricing.deliveryFee}</p>
                    </div>
                    <div className="pricing">
                        <p>Gst(7%)</p>
                        <p>Rs. {pricing.gstPercentage}</p>
                    </div>
                    <div className="pricing pricing-last-item">
                        <p>Total Amount</p>
                        <p>Rs. {pricing.totalAmount}</p>
                    </div>
                </div>

                <div className="card-footer">
                    <Link to="/checkout" className="btn btn-primary btn-full">Checkout</Link>
                </div>
            </div>
        </div>
    )
}