import { ErrorMessage, Field, Formik, Form } from "formik"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { toast } from "react-toastify"
import Loader from "../components/Loader"
import axios from "../utils/axios"
import { editSettingSchema } from "../utils/validationSchemas"

export default function EditSettingPage() {
    const { state } = useLocation()
    const [settings, setSettings] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchSettings = async () => {
        const { data } = await axios.get("/settings")

        setSettings(data)

        setIsLoading(false)
    }

    const handleSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true)

        await axios.patch("/settings", values)

        toast.success("Setting edited successfully")

        setSubmitting(false)
    }

    useEffect(() => {
        fetchSettings()
    }, [])

    if(isLoading) {
        return <Loader/>
    }

    return (
        <Formik
            initialValues={settings}
            onSubmit={handleSubmit}
            validationSchema={editSettingSchema}
        >
            {({ isSubmitting }) => (
                <Form className="card form">
                    <h2 className="card-header card-header-title">Change Setting</h2>

                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="deliveryFee" className="form-label">Delivery Fee</label>
                            <Field
                                type="text"
                                id="deliveryFee"
                                className="form-control"
                                name="deliveryFee"
                            />
                            <ErrorMessage as="p" name="deliveryFee" className="form-error"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="gstPercentage" className="form-label">Gst(%)</label>
                            <Field
                                type="text"
                                id="gstPercentage"
                                className="form-control"
                                name="gstPercentage"
                            />
                            <ErrorMessage as="p" name="gstPercentage" className="form-error"/>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn btn-primary btn-full"
                        >
                            {isLoading ? "Please wait..." : "Save"}
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}