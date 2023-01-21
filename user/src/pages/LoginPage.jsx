import { ErrorMessage, Field, Form, Formik } from "formik"
import { useSearchParams } from "react-router-dom"
import { toast } from "react-toastify"
import axios from "utils/axios"
import { loginSchema } from "utils/validationSchema"

export default function LoginPage() {
    const [queries] = useSearchParams()

    const handleSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true)

        try {
            const { data } = await axios.post("/auth/login", values)

            localStorage.setItem("token", data.token)

            window.location.href = queries.get("returnUrl") ?? "/"

        } catch ({ response }) {

            response?.status === 422 && toast.error("Invalid email or password")
        }

        setSubmitting(false)
    }

    return (
        <Formik
            initialValues={{
                email: "",
                password: ""
            }}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form className="card max-w-500 mx-auto">
                    <h2 className="card-header card-title text-center">Login</h2>

                    <div className="card-body">
                        <div className="form-group">
                            <label html="email" className="form-label">Email</label>
                            <Field
                                type="email"
                                id="email"
                                className="form-control"
                                name="email"
                            />
                            <ErrorMessage component="p" name="email" className="form-error" />
                        </div>

                        <div className="form-group">
                            <label html="password" className="form-label">Password</label>
                            <Field
                                id="password"
                                className="form-control"
                                name="password"
                                type="password"
                            />
                            <ErrorMessage component="p" name="password" className="form-error" />
                        </div>

                        <button type="submit" className="btn btn-primary btn-full" disabled={isSubmitting}>
                            {isSubmitting ? "Please Wait..." : "Login"}
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}