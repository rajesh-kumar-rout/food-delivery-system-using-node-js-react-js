import { ErrorMessage, Field, Form, Formik } from "formik"
import { useRef } from "react"
import { toast } from "react-toastify"
import axios from "../utils/axios"
import { handleImage } from "../utils/functions"
import { categorySchema } from "../utils/validationSchemas"

export default function CreateCategoryPage() {
    const imgRef = useRef()

    const handleSubmit = async (values, { resetForm, setSubmitting }) => {
        setSubmitting(true)

        try {
            await axios.post("/categories", values)

            resetForm()

            imgRef.current.value = ""

            toast.success("Category created successfully")

        } catch ({ response }) {

            response?.status === 409 && toast.error("Category already exists")
        }

        setSubmitting(false)
    }

    return (
        <Formik
            initialValues={{
                name: "",
                image: ""
            }}
            validationSchema={categorySchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting, setFieldValue }) => (
                <Form className="card">
                    <p className="card-header card-title">Create Category</p>

                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="name" className="form-label">Name</label>
                            <Field
                                type="text"
                                id="name"
                                className="form-control"
                                name="name"
                            />
                            <ErrorMessage component="p" name="name" className="form-error" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="image" className="form-label">Image</label>
                            <input
                                type="file"
                                id="image"
                                className="form-control"
                                name="image"
                                required
                                accept=".png, .jpeg, .jpg"
                                ref={imgRef}
                                onChange={event => handleImage(event, setFieldValue)}
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