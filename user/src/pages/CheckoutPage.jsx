
import { ErrorMessage, Field, Formik, Form } from "formik"
import { useEffect } from "react"
import { useState } from "react"
import Loader from "../components/Loader"
import axios from "../utils/axios"
import swal from "sweetalert"
import { useNavigate } from "react-router-dom"
import { number, string, object } from "yup"

export const validationSchema = object().shape({
    name: string()
        .trim()
        .min(2, "Name must be at least 2 characters")
        .max(30, "Name must be within 30 characters")
        .required("Name is required"),

    street: string()
        .min(4, "Please describe more about your area")
        .max(255, "Street must be within 255 characters")
        .required("Street is required"),

    landmark: string()
        .max(255, "Landmark must be within 30 characters")
        .required("Landmark is required"),

    mobile: number()
        .min(999999999, "Invalid mobile number")
        .max(9999999999, "Invalid mobile number")
        .required("Mobile number is required"),
})

export default function CheckoutPage() {
    const navigate = useNavigate()

    const [deliveryFee, setDeliveryFee] = useState(0)
    const [gstPercentage, setGstPercentage] = useState(0)
    const [gstAmount, setGstAmount] = useState(0)
    const [totalPayable, setTotalPayable] = useState(0)
    const [isFetching, setIsFetching] = useState(true)
    const [deliveryAddress, setDeliveryAddress] = useState({
        name: "",
        street: "",
        landmark: "",
        mobile: ""
    })

    const fetchData = async () => {
        // const { data } = await axios.get("/cart/pricing")

        // if (localStorage.getItem("deliveryAddress")) {
        //     setDeliveryAddress(JSON.parse(localStorage.getItem("deliveryAddress")))
        // }

        // setDeliveryFee(data.deliveryFee)
        // setGstPercentage(data.gstPercentage)
        // setGstAmount(data.gstAmount)
        // setTotalPayable(data.totalPayable)
        // setIsFetching(false)
    }

    const handleSubmit = async (values, { setSubmitting }) => {
        if (values.saveForNextTime) {
            localStorage.setItem("deliveryAddress", values)
        }

        setSubmitting(true)

        const { data } = await axios.post("/order", values)

        swal({
            title: "Thank You",
            text: `You order placed successfully. Tracking id : ${data.id}`,
            icon: "success",
            button: "Ok"
        })

        navigate("/")
    }

    useEffect(() => {
        fetchData()
    }, [])

    // if (isFetching) {
    //     return <Loader />
    // }

    return (
        <Formik
            initialValues={deliveryAddress}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form className="checkout">
                    <div className="card">
                        <h2 className="card-header card-title">Delivery Address</h2>

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
                                <label htmlFor="mobile" className="form-label">Mobile</label>
                                <Field
                                    type="number"
                                    id="mobile"
                                    className="form-control"
                                    name="mobile"
                                />
                                <ErrorMessage component="p" name="mobile" className="form-error" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="street" className="form-label">Street</label>
                                <Field
                                    type="text"
                                    id="street"
                                    className="form-control"
                                    name="street"
                                />
                                <ErrorMessage component="p" name="street" className="form-error" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="landmark" className="form-label">Landmark</label>
                                <Field
                                    type="text"
                                    id="landmark"
                                    className="form-control"
                                    name="landmark"
                                />
                                <ErrorMessage component="p" name="landmark" className="form-error" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="building" className="form-label">Building/apartment</label>
                                <Field
                                    type="text"
                                    id="building"
                                    className="form-control"
                                    name="building"
                                />
                                <ErrorMessage component="p" name="building" className="form-error" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="instruction" className="form-label">Instruction</label>
                                <Field
                                    type="text"
                                    id="instruction"
                                    className="form-control"
                                    name="instruction"
                                />
                                <ErrorMessage component="p" name="instruction" className="form-error" />
                            </div>

                            <div className="form-check">
                                <Field
                                    type="checkbox"
                                    id="nextTime"
                                    className="form-check-input"
                                    name="nextTime"
                                />
                                <label className="form-check-label">Save this address for next time</label>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="card">
                            <p className="card-header card-title">Cart Summary</p>

                            <div className="card-body">
                                <div className="pricing">
                                    <p>Total Price</p>
                                    <p>₹ 56</p>
                                </div>
                                <div className="pricing">
                                    <p>Delivery Fee</p>
                                    <p>₹ 78</p>
                                </div>
                                <div className="pricing">
                                    <p>Gst 7%</p>
                                    <p>₹ 78</p>
                                </div>
                                <div className="pricing pricing-last-item">
                                    <p>Total Payable</p>
                                    <p>₹ 234</p>
                                </div>
                            </div>

                            <div className="card-footer">
                                <button className="btn btn-primary btn-full">Place Order</button>
                            </div>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
    return <div></div>
}