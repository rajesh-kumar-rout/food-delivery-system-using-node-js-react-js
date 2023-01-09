import { useState } from "react"
import { postData } from "../utils/fetcher"

export default function CreateDelveryBoyPage() {
    const [isSubmitting, setSubmitting] = useState(false)
    const [email, setEmail] = useState("")

    const handleSubmit = async e => {
        e.preventDefault()

        setSubmitting(true)
        const { status } = await postData("/delivery-boys", { email })
        if(status === 404){
            alert("Account boy not found")
        }else{
            alert("Delivery boy added successfully")
            setEmail("")
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