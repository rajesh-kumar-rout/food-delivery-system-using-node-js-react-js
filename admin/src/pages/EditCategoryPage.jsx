import { ErrorMessage, Field, Form, Formik } from "formik"
import { useRef } from "react"
import { useLocation } from "react-router-dom"
import { toast } from "react-toastify"
import axios from "../utils/axios"
import { handleImage } from "../utils/functions"
import { categorySchema } from "../utils/validationSchemas"

export default function EditCategoryPage() {
    const { state } = useLocation()
    const imgRef = useRef()

    const handleSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true)

        try {
            await axios.patch(`/categories/${state.id}`, values)

            toast.success("Category updated")

            imgRef.current.value = ""

        } catch ({ response }) {

            response?.status === 409 && toast.error("Category already exists")
        }

        setSubmitting(false)
    }

    return (
        <Formik
            initialValues={state}
            validationSchema={categorySchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting, setFieldValue }) => (
                <Form className="card">
                    <p className="card-header card-title">Edit Category</p>

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
                            {isSubmitting ? "Please wait..." : "Update"}
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}