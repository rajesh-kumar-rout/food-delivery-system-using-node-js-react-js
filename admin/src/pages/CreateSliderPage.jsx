import { useState } from "react"
import { toast } from "react-toastify"
import axios from "../utils/axios"

export default function CreateSliderPage() {
    const [imageUrl, setImageUrl] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async event => {
        event.preventDefault()

        setIsSubmitting(true)

        await axios.post("/sliders", {imageUrl})

        event.target.reset()

        setImageUrl("")

        setIsSubmitting(false)

        toast.success("Slider created successfully")
    }

    return (
        <form className="card form" onSubmit={handleSubmit}>
            <h2 className="card-header card-header-title">Create Slider</h2>

            <div className="card-body">
                <div className="form-group">
                    <label htmlFor="imageUrl" className="form-label">Image</label>
                    <input
                        type="text"
                        id="imageUrl"
                        className="form-control"
                        name="imageUrl"
                        onChange={event => setImageUrl(event.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary"
                >
                    {isSubmitting ? "Please wait..." : "Save"}
                </button>
            </div>
        </form>
    )
}