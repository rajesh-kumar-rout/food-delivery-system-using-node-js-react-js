import moment from "moment/moment"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Loader from "../components/Loader"
import axios from "../utils/axios"
import { currency } from "../utils/functions"

export default function OrdersPage() {
    const [orders, setOrders] = useState([])
    const [isFetching, setIsFetching] = useState(true)

    const fetchOrders = async () => {
        const { data } = await axios.get("/orders")

        setOrders(data)

        setIsFetching(false)
    }

    useEffect(() => {
        fetchOrders()
    }, [])

    if (isFetching) {
        return <Loader />
    }

    return (
        <div className="card">
            <div className="card-header card-title">Orders</div>
            <div className="card-body">
                <div className="table-container">
                    <table style={{ minWidth: 800 }}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Total Amount</th>
                                <th>Status</th>
                                <th>Ordered At</th>
                                <th>View</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="text-sm text-muted">No Orders Found</td>
                                </tr>
                            )}
                            {orders.map(order => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{currency.format(order.paymentDetails.totalAmount)}</td>
                                    <td>
                                        <p className={`badge badge-success`}>
                                            {order.status}
                                        </p>
                                    </td>
                                    <td>{moment(order.createdAt).format("D MMM GG h:m A")}</td>
                                    <td>
                                        <Link to={`/auth/orders/${order.id}`} className="btn btn-primary btn-sm">
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}