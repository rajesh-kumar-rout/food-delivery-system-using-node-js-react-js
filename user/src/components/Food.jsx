import { useState } from "react"
import { toast } from "react-toastify"
import axios from "utils/axios"
import Button from "./Button"
import QuantityControl from "./QtyControl"

export default function Food({ food }) {
    const [qty, setQty] = useState(1)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleAddToCart = async () => {
        setIsSubmitting(true)

        await axios.post("/cart", {
            foodId: food.id,
            qty
        })

        toast.success("Added to cart")
        
        setIsSubmitting(false)
    }

    return (
        <div className="food">
            <div className="food-type food-type-veg"></div>
            
            <img src={food.imageUrl} />

            <p className="food-name">{food.name}</p>

            <p className="food-price">Rs. {food.price}</p>

            <div className="food-footer">
                <QuantityControl quantity={qty} onChange={quantity => setQty(quantity)}/>
                
                <Button
                    authenticated
                    className="btn btn-primary btn-sm"
                    onClick={handleAddToCart}
                    disabled={isSubmitting}
                >
                    Add To Cart
                </Button>
            </div>
        </div>
    )
}