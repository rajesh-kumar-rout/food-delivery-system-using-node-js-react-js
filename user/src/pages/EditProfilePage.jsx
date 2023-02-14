import { ErrorMessage, Field, Form, Formik } from "formik"
import { useContext } from "react"
import { toast } from "react-toastify"
import { AuthContext } from "../components/Auth"
import axios from "../utils/axios"
import { changePasswordSchema, updateProfileSchema } from "../utils/validationSchema"

export default function EditProfilePage() {
    const { currentUser, setCurrentUser } = useContext(AuthContext)

    const handleProfileUpdate = async (values, { setSubmitting }) => {
        setSubmitting(true)

        try {
            await axios.patch("/auth/edit-profile", values)

            toast.success("Account updated successfully")

            setCurrentUser({
                ...currentUser,
                ...values
            })

        } catch ({ response }) {

            response?.status === 409 && toast.error("Email already exists")
        }

        setSubmitting(false)
    }

    const handlePasswordChange = async (values, { setSubmitting, resetForm }) => {
        setSubmitting(true)

        try {
            await axios.patch("/auth/change-password", values)

            toast.success("Password changed successfully")

            resetForm()

        } catch ({ response }) {

            response?.status === 422 && toast.error("Old password does not match")
        }

        setSubmitting(false)
    }

    return (
        <div>
            <Formik
                initialValues={{
                    name: currentUser.name ?? "",
                    email: currentUser.email ?? ""
                }}
                validationSchema={updateProfileSchema}
                onSubmit={handleProfileUpdate}
            >
                {({ isSubmitting }) => (
                    <Form className="card" style={{ maxWidth: 500, margin: "auto" }}>
                        <h2 className="card-header card-title">Edit Personal Info</h2>

                        <div className="card-body">
                            <div className="form-group">
                                <label htmlFor="name" className="form-label">Name</label>
                                <Field
                                    type="text"
                                    id="name"
                                    className="form-control"
                                    name="name"
                                />
                                <ErrorMessage
                                    component="p"
                                    name="name"
                                    className="form-error"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email" className="form-label">Email</label>
                                <Field
                                    type="email"
                                    id="email"
                                    className="form-control"
                                    name="email"
                                />
                                <ErrorMessage
                                    component="p"
                                    name="email"
                                    className="form-error"
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Please wait..." : "Update"}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>

            <Formik
                initialValues={{
                    oldPassword: "",
                    newPassword: "",
                    confirmNewPassword: ""
                }}
                validationSchema={changePasswordSchema}
                onSubmit={handlePasswordChange}
            >
                {({ isSubmitting }) => (
                    <Form className="card" style={{ maxWidth: 500, margin: "16px auto 0px" }}>
                        <p className="card-header card-title">Change Password</p>

                        <div className="card-body">
                            <div className="form-group">
                                <label htmlFor="oldPassword" className="form-label">Old Password</label>
                                <Field
                                    type="password"
                                    id="oldPassword"
                                    className="form-control"
                                    name="oldPassword"
                                />
                                <ErrorMessage component="p" name="oldPassword" className="form-error" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="newPassword" className="form-label">New Password</label>
                                <Field
                                    type="password"
                                    id="newPassword"
                                    className="form-control"
                                    name="newPassword"
                                />
                                <ErrorMessage component="p" name="newPassword" className="form-error" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="confirmNewPassword" className="form-label">Confirm New Password</label>
                                <Field
                                    type="password"
                                    id="confirmNewPassword"
                                    className="form-control"
                                    name="confirmNewPassword"
                                />
                                <ErrorMessage component="p" name="confirmNewPassword" className="form-error" />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Please Wait..." : "Change Password"}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}