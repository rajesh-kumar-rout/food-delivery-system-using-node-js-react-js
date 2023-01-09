import { Formik, Form, Field, ErrorMessage } from "formik"
import { toast } from "react-toastify"
import { object, string, ref } from "yup"
import axios from "utils/axios"

export const validationSchema = object().shape({
    oldPassword: string().required("Password is required"),

    newPassword: string()
        .min(6, "Password must be at least 6 characters")
        .max(20, "Password must be within 30 characters")
        .required("Password is required"),

    confirmNewPassword: string()
        .required("Please confirm your password")
        .oneOf([ref("newPassword"), null], "Password mismatch")
})

export default function ChangePasswordPage() {
    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        setSubmitting(true)
        try {
            await axios.patch("/account/password", values)
            toast.success("Password changed successfully")
            resetForm()
        } catch ({ response }) {
            response?.status === 422 && toast.error("Old password does not match")
        }
        setSubmitting(false)
    }

    return (
        <Formik
            initialValues={{
                oldPassword: "",
                newPassword: "",
                confirmNewPassword: ""
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form className="card max-w-500 mx-auto">
                    <p className="card-header card-title text-center">Change Password</p>

                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="oldPassword" className="form-label">Old Password</label>
                            <Field
                                id="oldPassword"
                                className="form-control"
                                name="oldPassword"
                            />
                            <ErrorMessage component="p" name="oldPassword" className="form-error" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="newPassword" className="form-label">New Password</label>
                            <Field
                                id="newPassword"
                                className="form-control"
                                name="newPassword"
                            />
                            <ErrorMessage component="p" name="newPassword" className="form-error" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmNewPassword" className="form-label">Confirm New Password</label>
                            <Field
                                id="confirmNewPassword"
                                className="form-control"
                                name="confirmNewPassword"
                            />
                            <ErrorMessage component="p" name="confirmNewPassword" className="form-error" />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-full"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Please Wait..." : "Change Password"}
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}