import { ErrorMessage, Field, Form, Formik } from "formik"
import { useLocation } from "react-router-dom"
import { toast } from "react-toastify"
import * as yup from "yup"
import axios from "../utils/axios"

const schema = yup.object().shape({
    name: yup.string()
        .trim()
        .min(2, "Name must be at least 2 characters")
        .max(30, "Name must be within 30 characters")
        .required("Name is required")
})

export default function EditCategoryPage() {
    const { state } = useLocation()

    const handleSubmit = async (values, { resetForm, setSubmitting }) => {
        setSubmitting(true)

        try {
            await axios.patch(`/categories/${state.id}`, values)

            toast.success("Category updated")

            resetForm()

        } catch ({ response }) {
            
            response?.status === 409 && toast.error("Category already exists")
        }

        setSubmitting(false)
    }

    return (
        <Formik
            initialValues={state}
            validationSchema={schema}
            onSubmit={handleSubmit}
        >
            {({ values, isSubmitting, setFieldValue, handleBlur }) => (
                <Form className="card form">
                    <h2 className="card-header card-header-title">Edit Category</h2>

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
                            <label htmlFor="imageUrl" className="form-label">Image</label>
                            <Field
                                type="text"
                                id="imageUrl"
                                className="form-control"
                                name="imageUrl"
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