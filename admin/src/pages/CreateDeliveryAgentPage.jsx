import { useState } from "react"
import { toast } from "react-toastify"
import axios from "../utils/axios"

export default function CreateDelveryAgentPage() {
    const [isSubmitting, setSubmitting] = useState(false)
    const [email, setEmail] = useState("")

    const handleSubmit = async event => {
        event.preventDefault()

        setSubmitting(true)
        
        try {
            await axios.post("/delivery-agents", { email })
            
            toast.success("Delivery boy added successfully")

            setEmail("")

        } catch ({ response }) {
            
            response.status === 404 && toast.error("User not found")
        }

        setSubmitting(false)
    }

    return (
        <form className="card form" onSubmit={handleSubmit}>
            <h2 className="card-header card-header-title">Create Delivery Boy</h2>

            <div className="card-body">
                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        name="email"
                        onChange={e => setEmail(e.target.value)}
                        value={email}
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