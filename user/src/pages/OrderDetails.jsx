import Loader from "components/Loader"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "utils/axios"

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
        <div className="order-details">
            <div className="card">
                <div className="card-header card-title">Foods</div>
                <div className="card-body">
                    <div className="table-container">
                        <table style={{ textAlign: "left", minWidth: 400 }}>
                            <thead>
                                <tr >
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
                                        <td>{food.qty}</td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div>
                <div className="card">
                    <div className="card-header card-title">
                        Delivery Address
                    </div>

                    <div className="card-body">
                        <p>{deliveryAddress.name}, {deliveryAddress.mobile}</p>
                        <p className="mt-2">{deliveryAddress.street}</p>
                        <p className="mt-2">{deliveryAddress.landmark}</p>
                        <p className="mt-2">instruction: {deliveryAddress.instruction}</p>
                    </div>
                </div>

                <div className="card" style={{ marginTop: 20 }}>
                    <div className="card-header card-title">
                        Pricing Details
                    </div>

                    <div className="card-body">
                        <p>Food Price: Rs {paymentDetails.foodPrice}</p>
                        <p className="mt-2">Delivery Fee: Rs {paymentDetails.deliveryFee}</p>
                        <p className="mt-2">Gst ({paymentDetails.gstPercentage}%): Rs {paymentDetails.gstAmount}</p>
                        <p className="mt-2">Total Amount: Rs {paymentDetails.totalAmount}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}