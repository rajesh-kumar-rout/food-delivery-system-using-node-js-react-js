import { Field, Form, Formik } from "formik"
import { toast } from "react-toastify"
import axios from "../utils/axios"

export default function CreateDelveryAgentPage() {

    const handleSubmit = async (values, { resetForm, setSubmitting }) => {
        setSubmitting(true)

        try {
            await axios.post("/delivery-agents", values)

            toast.success("Delivery boy added successfully")

            resetForm()

        } catch ({ response }) {

            response.status === 404 && toast.error("User not found")
        }

        setSubmitting(false)
    }

    return (
        <Formik
            initialValues={{ email: "" }}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form className="card">
                    <p className="card-header card-title">Create Delivery Boy</p>

                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Email</label>
                            <Field
                                type="email"
                                id="email"
                                className="form-control"
                                name="email"
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
                </Form>
            )}
        </Formik>
    )
}