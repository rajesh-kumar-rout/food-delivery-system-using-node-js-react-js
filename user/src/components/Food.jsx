import { useState } from "react"
import { toast } from "react-toastify"
import axios from "utils/axios"
import { currency } from "utils/functions"
import Button from "./Button"
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

        toast.success("Added to cart")
        
        setIsSubmitting(false)
    }

    return (
        <div className="food">
            <div className="food-type" data-vegan={food.isVegan}></div>
            
            <img src={food.imageUrl} />

            <p className="food-name">{food.name}</p>

            <p className="food-price">{currency.format(food.price)}</p>

            <div className="food-footer">
                <QuantityControl quantity={quantity} onChange={quantity => setQuantity(quantity)}/>
                
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