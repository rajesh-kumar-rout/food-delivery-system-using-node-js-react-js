import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import Loader from "components/Loader"
import axios from "utils/axios"

export default function OrderDetailsPage() {
    const { orderId } = useParams()

    const [foods, setFoods] = useState([])
    const [deliveryAddress, setDeliveryAddress] = useState({})
    const [pricingDetails, setPricingDetails] = useState({})
    const [isFetching, setIsFetching] = useState(false)

    const fetchData = async () => {
        // const { data } = await axios.get(`/orders/${orderId}`)
        // setIsFetching(false)
        // setFoods(data.foods)
        // setDeliveryAddress(data.deliveryAddress)
        // setPricingDetails(data.pricingDetails)
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
                                <tr>
                                    <td>
                                        <p style={{ textAlign: 'left' }}>Ginger pasta masala</p>
                                    </td>
                                    <td>1</td>
                                </tr>
                                <tr>
                                    <td>
                                        <p style={{ textAlign: 'left' }}>Veg masala noodles</p></td>
                                    <td>1</td>
                                </tr>
                                <tr>
                                    <td>
                                        <p style={{ textAlign: 'left' }}>Chicken 65 (small)</p>
                                    </td>
                                    <td>1</td>
                                </tr>
                                <tr>
                                    <td>
                                        <p style={{ textAlign: 'left' }}>Chicken kabab</p></td>
                                    <td>2</td>
                                </tr>
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
                        <p>A.P Nagar, 4th cross, main road</p>
                        <p className="mt-2">Near shiv temple</p>
                        <p className="mt-2">instruction: bring some water</p>
                    </div>
                </div>

                <div className="card" style={{ marginTop: 20 }}>
                    <div className="card-header card-title">
                        Pricing Details
                    </div>

                    <div className="card-body">
                        <p>Food Price: Rs 567</p>
                        <p className="mt-2">Delivery Fee: Rs 78</p>
                        <p className="mt-2">Gst (7%): Rs 34</p>
                        <p className="mt-2">Total Amount: Rs 789</p>
                    </div>
                </div>
            </div>
        </div>
    )
}