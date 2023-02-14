import { Form, Formik } from "formik"
import { useRef } from "react"
import { toast } from "react-toastify"
import axios from "../utils/axios"
import { handleImage } from "../utils/functions"

export default function CreateSliderPage() {
    const imgRef = useRef()

    const handleSubmit = async (values, { resetForm, setSubmitting }) => {
        setSubmitting(true)

        await axios.post("/sliders", values)

        imgRef.current.value = ""

        resetForm()

        setSubmitting(false)

        toast.success("Slider created successfully")
    }

    return (
        <Formik
            initialValues={{ image: "" }}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting, setFieldValue }) => (
                <Form className="card">
                    <p className="card-header card-title">Create Slider</p>

                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="image" className="form-label">Image</label>
                            <input
                                type="file"
                                id="image"
                                className="form-control"
                                name="image"
                                onChange={event => handleImage(event, setFieldValue)}
                                required
                                accept=".png, .jpeg, .jpg"
                                ref={imgRef}
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
                </Form>
            )}
        </Formik>
    )
}