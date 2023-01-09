import { useState } from "react"
import { toast } from "react-toastify"
import { postData } from "../utils/fetcher"
import { getFileForm } from "../utils/functions"

export default function CreateSliderPage() {
    const [img, setImg] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async e => {
        e.preventDefault()

        setIsSubmitting(true)

        const { status } = await postData("/sliders", getFileForm("img", img))

        if (status === 201) {
            e.target.reset()
            setImg(null)
            setIsSubmitting(false)
            toast.success("Slider created successfully")
        }
    }

    return (
        <form className="card form" onSubmit={handleSubmit}>
            <h2 className="card-header card-header-title">Create Slider</h2>

            <div className="card-body">
                <div className="form-group">
                    <label htmlFor="img" className="form-label">Image</label>
                    <input
                        type="file"
                        id="img"
                        className="form-control"
                        name="img"
                        onChange={e => setImg(e.target.files[0])}
                        required
                        accept=".jpg, .jpeg, .png"
                    />
                    {img && <img className="form-img-preview" src={URL.createObjectURL(img)} />}
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