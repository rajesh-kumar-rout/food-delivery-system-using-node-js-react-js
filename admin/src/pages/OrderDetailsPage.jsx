import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { getData, patchData } from "../utils/fetcher"

export default function OrderDetailsPage() {
    const { orderId } = useParams()
    const [deliveryAddress, setDeliveryAddress] = useState({})
    const [paymentDetails, setPaymentDetails] = useState({})
    const [statuses, setStatuses] = useState([])
    const [deliveryBoys, setDeliveryBoys] = useState([])
    const [foods, setFoods] = useState([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [order, setOrder] = useState({})
    const [deliveryBoyId, setDeliveryBoyId] = useState()
    const [orderStatusId, setOrderStatusId] = useState()

    useEffect(() => {
        setDeliveryBoyId(order.deliveryBoyId)
        setOrderStatusId(order.orderStatusId)
    }, [order])

    const fetchDetails = async () => {
        setIsLoading(true)
        const { data } = await getData("/orders/" + orderId)
        const { data: statuses } = await getData("/orders/statuses")
        const { data: deliveryBoys } = await getData("/delivery-boys")
        setOrder(data.order)
        setDeliveryBoys(deliveryBoys)
        setStatuses(statuses)
        setDeliveryAddress(data.deliveryAddress)
        setPaymentDetails(data.paymentDetails)
        setFoods(data.orderedFoods)
        setIsLoading(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setIsSubmitting(true)
        const { data } = await patchData("/orders/" + orderId, { deliveryBoyId, orderStatusId })
        setIsSubmitting(false)
    }

    useEffect(() => {
        fetchDetails()
    }, [])

    return (
        <div className="order-details">
            <div className="card order-details-card">
                <h4 className="card-header card-title">Foods</h4>
                <div className="card-body order-details-body">
                    {foods.map(food => (
                        <p>{food.food} ({food.option}) &times; {food.qty}</p>
                    ))}
                </div>
            </div>

            <div className="card order-details-card">
                <h4 className="card-header card-title">Address</h4>
                <div className="card-body order-details-body">
                    <p>Name : {deliveryAddress.name}</p>
                    <p>Street : {deliveryAddress.street}</p>
                    <p>Near : {deliveryAddress.landmark}</p>
                    <p>Mobile : {deliveryAddress.mobile} </p>
                    {deliveryAddress.instruction && <p>Instruction : {deliveryAddress.instruction}</p>}
                </div>
            </div>

            <div className="card order-details-card">
                <h4 className="card-header card-title">Payment Details</h4>
                <div className="card-body order-details-body">
                    <p>Transaction ID : 3058675</p>
                    <p>Paid : {paymentDetails.amount}</p>
                    <p>Gst : {paymentDetails.gst}%</p>
                    <p>Delivery Fee : {paymentDetails.deliveryFee}</p>
                </div>
            </div>

            <div className="card order-details-card">
                <h4 className="card-header card-title">Update</h4>

                <form className="card-body" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="deliveryBoy" className="form-label">Delivery Boy</label>
                        <select
                            id="deliveryBoy"
                            name="deliveryBoyId"
                            className="form-control"
                            value={deliveryBoyId}
                            required
                            onChange={e => setDeliveryBoyId(e.target.value)}
                        >
                            <option></option>
                            {deliveryBoys.map(deliveryBoy => (
                                <option value={deliveryBoy.id}>{deliveryBoy.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="status" className="form-label">Status</label>
                        <select
                            id="status"
                            name="status"
                            className="form-control"
                            value={orderStatusId}
                            onChange={e => setOrderStatusId(e.target.value)}
                            required
                        >
                            <option></option>
                            {statuses.map(status => (
                                <option value={status.id}>{status.name}</option>
                            ))}
                        </select>
                    </div>

                    <button
                        disabled={isSubmitting}
                        className="btn btn-primary"
                    >
                        {isSubmitting ? "Please wait..." : "Save"}
                    </button>
                </form>
            </div>
        </div>
    )
}