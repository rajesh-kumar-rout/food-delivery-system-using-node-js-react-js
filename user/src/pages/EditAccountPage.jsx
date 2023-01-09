import { Formik, Field, ErrorMessage } from "formik"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { object, string } from "yup"
import Loader from "components/Loader"
import axios from "utils/axios"

export const schema = object().shape({
    name: string()
        .trim()
        .min(2, "Name must be at least 2 characters")
        .max(30, "Name must be within 30 characters")
        .required("Name is required")
})

export default function EditAccountPage() {
    const [user, setUser] = useState([])
    const [isFetching, setIsFetching] = useState(false)

    const fetchUser = async () => {
        // const { data } = await axios.get("/account")

        // setUser(data)
        // setIsFetching(false)
    }

    const handleSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true)
        try {
            await axios.patch("/account", values)
            toast.success("Account edited successfully")
        } catch ({ response }) {
            response?.status === 409 && toast.error("Email already exists")
        }
        setSubmitting(false)
    }

    useEffect(() => {
        fetchUser()
    }, [])

    if (isFetching) {
        return <Loader />
    }

    return (
        <Formik
            initialValues={{
                name: user.name ?? "",
                email: user.email ?? ""
            }}
            validationSchema={schema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <form className="card max-w-500 mx-auto">
                    <h2 className="card-header card-title text-center">Edit Account</h2>

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
                                disabled
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-full"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Please wait..." : "Update"}
                        </button>
                    </div>
                </form>
            )}
        </Formik>
    )
}