import { ErrorMessage, Field, Form, Formik } from "formik"
import { toast } from "react-toastify"
import axios from "../utils/axios"
import { categorySchema } from "../utils/validationSchemas"

export default function CreateCategoryPage() {

    const handleSubmit = async (values, { resetForm, setSubmitting }) => {
        setSubmitting(true)

        try {
            await axios.post("/categories", values)

            resetForm()
            
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
                imageUrl: ""
            }}
            validationSchema={categorySchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form className="card form">
                    <h2 className="card-header card-header-title">Create Category</h2>

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
                            <label htmlFor="img" className="form-label">Image Url</label>
                            <Field
                                type="text"
                                id="imageUrl"
                                className="form-control"
                                name="imageUrl"
                            />
                            <ErrorMessage component="p" name="imageUrl" className="form-error" />
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