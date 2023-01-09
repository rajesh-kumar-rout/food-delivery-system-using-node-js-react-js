import { useState } from "react"
import axios from "utils/axios"
import QuantityControl from "./QtyControl"

export default function Food({ food }) {
    const [quantity, setQuantity] = useState(1)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleAddToCart = async () => {
        setIsSubmitting(true)
        await axios.post("/cart", {
            foodId: food.id,
            quantity
        })
        setIsSubmitting(false)
    }

    return (
        <div className="food">
            <div className="food-type food-type-veg"></div>
            <img src={food.imgUrl} />
            <p className="food-name">{food.name}</p>
            <p className="food-price">Rs. {food.price}</p>
            <div className="food-footer">
                <QuantityControl quantity={quantity} onChange={quantity => setQuantity(quantity)}/>
                <button
                    className="btn btn-primary btn-sm"
                    onClick={handleAddToCart}
                    disabled={isSubmitting}
                >
                    Add To Cart
                </button>
            </div>
        </div>
    )
}