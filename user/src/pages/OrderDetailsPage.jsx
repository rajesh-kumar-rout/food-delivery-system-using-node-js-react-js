import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Loader from "../components/Loader"
import axios from "../utils/axios"
import { currency } from "../utils/functions"

export default function OrderDetailsPage() {
    const { orderId } = useParams()

    const [order, setOrder] = useState({})
    const [isFetching, setIsFetching] = useState(true)

    const { paymentDetails, deliveryAddress, foods } = order

    const fetchData = async () => {
        const { data } = await axios.get(`/orders/${orderId}`)
        setOrder(data)
        setIsFetching(false)
    }

    useEffect(() => {
        fetchData()
    }, [])

    if (isFetching) {
        return <Loader />
    }

    return (
        <div className="details">
            <div className="card">
                <div className="card-header card-title">Foods</div>

                <div className="card-body">
                    <div className="table-container">
                        <table style={{ textAlign: "left", minWidth: 400 }}>
                            <thead>
                                <tr>
                                    <th>Food</th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {foods.map(food => (
                                    <tr>
                                        <td>
                                            <p style={{ textAlign: "left" }}>{food.name}</p>
                                        </td>
                                        <td>{food.quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div>
                <div className="card">
                    <p className="card-header card-title">Delivery Address</p>

                    <div className="card-body">
                        <p>{deliveryAddress.name}, {deliveryAddress.mobile}</p>

                        <p className="details-spacing">{deliveryAddress.street}</p>

                        <p className="details-spacing">{deliveryAddress.landmark}</p>

                        {deliveryAddress.instruction && <p className="details-spacing">instruction: {deliveryAddress.instruction}</p>}
                    </div>
                </div>

                <div className="card" style={{ marginTop: 20 }}>
                    <p className="card-header card-title">Pricing Details</p>

                    <div className="card-body">
                        <p>Food Price: {currency.format(paymentDetails.foodPrice)}</p>

                        <p className="details-spacing">Delivery Fee: {currency.format(paymentDetails.deliveryFee)}</p>

                        <p className="details-spacing">Gst ({paymentDetails.gstPercentage}%): {currency.format(paymentDetails.gstAmount)}</p>

                        <p className="details-spacing">Total Amount: {currency.format(paymentDetails.totalAmount)}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}