
import { ErrorMessage, Field, Form, Formik } from "formik"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import swal from "sweetalert"
import Loader from "../components/Loader"
import axios from "../utils/axios"
import { checkoutSchema } from "../utils/validationSchema"

export default function CheckoutPage() {
    const navigate = useNavigate()

    const [pricing, setPricing] = useState({})
    const [isFetching, setIsFetching] = useState(true)

    const fetchData = async () => {
        const { data } = await axios.get("/cart/pricing")
        setPricing(data)
        setIsFetching(false)
    }

    const handleSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true)

        const { data } = await axios.post("/orders", values)

        swal({
            title: "Thank You",
            text: `You order placed successfully. Tracking id : ${data.orderId}`,
            icon: "success",
            button: "Ok"
        })

        navigate("/")
    }

    useEffect(() => {
        fetchData()
    }, [])

    if (isFetching) {
        return <Loader />
    }

    if (!pricing.foodPrice) {
        return navigate("/", { replace: true })
    }

    return (
        <Formik
            initialValues={{
                name: "",
                street: "",
                landmark: "",
                mobile: "",
                building: "",
                instruction: ""
            }}
            validationSchema={checkoutSchema}
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

                            <div>
                                <label htmlFor="instruction" className="form-label">Instruction</label>
                                <Field
                                    type="text"
                                    id="instruction"
                                    className="form-control"
                                    name="instruction"
                                />
                                <ErrorMessage component="p" name="instruction" className="form-error" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="card">
                            <p className="card-header card-title">Cart Summary</p>

                            <div className="card-body">
                                <div className="pricing">
                                    <p>Food Price</p>
                                    <p>₹ {pricing.foodPrice}</p>
                                </div>
                                <div className="pricing">
                                    <p>Delivery Fee</p>
                                    <p>₹ {pricing.deliveryFee}</p>
                                </div>
                                <div className="pricing">
                                    <p>Gst {pricing.gstPercentage}%</p>
                                    <p>₹ {pricing.gstAmount}</p>
                                </div>
                                <div className="pricing pricing-last-item">
                                    <p>Total Amount</p>
                                    <p>₹ {pricing.totalAmount}</p>
                                </div>
                            </div>

                            <div className="card-footer">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="btn btn-primary btn-full"
                                >
                                    Place Order
                                </button>
                            </div>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}