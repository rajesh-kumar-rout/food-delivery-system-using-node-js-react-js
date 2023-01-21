import { Formik, Form, Field, ErrorMessage } from "formik"
import { object, string, ref } from "yup"
import { toast } from "react-toastify"
import axios from "utils/axios"

export const schema = object().shape({
    name: string()
        .trim()
        .min(2, "Name must be at least 2 characters")
        .max(30, "Name must be within 30 characters")
        .required("Name is required"),

    email: string()
        .max(30, "Email must be within 30 characters")
        .required("Email is required"),

    password: string()
        .min(6, "Password must be at least 6 characters")
        .max(20, "Password must be within 30 characters")
        .required("Password is required"),

    confirmPassword: string()
        .required("Please confirm your password")
        .oneOf([ref("password"), null], "Password mismatch"),
})

export default function RegisterPage() {

    const handleSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true)
        try {
            await axios.post("/account/register", values)
        } catch ({ response }) {
            response?.status === 409 && toast.error("Email already exists")
        }
        setSubmitting(false)
    }

    return (
        <Formik
            initialValues={{
                name: "",
                email: "",
                password: "",
                confirmPassword: ""
            }}
            validationSchema={schema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form className="card max-w-500 mx-auto">
                    <h2 className="card-header card-title text-center">Sign Up</h2>

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
                            <label htmlFor="email" className="form-label">Email</label>
                            <Field
                                type="email"
                                id="email"
                                className="form-control"
                                name="email"
                            />
                            <ErrorMessage component="p" name="email" className="form-error" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password" className="form-label">Password</label>
                            <Field
                                type="password"
                                id="password"
                                className="form-control"
                                name="password"
                            />
                            <ErrorMessage component="p" name="password" className="form-error" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                            <Field
                                type="password"
                                id="confirmPassword"
                                className="form-control"
                                name="confirmPassword"
                            />
                            <ErrorMessage component="p" name="confirmPassword" className="form-error" />
                        </div>

                        <button type="submit" className="btn btn-primary btn-full" disabled={isSubmitting}>
                            {isSubmitting ? "Please wait..." : "Sign Up"}
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}