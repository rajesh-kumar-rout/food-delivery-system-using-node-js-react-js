import Loader from "components/Loader"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "utils/axios"

export default function OrdersPage() {
    const [orders, setOrders] = useState([])
    const [isFetching, setIsFetching] = useState(false)

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
                                <th>Total Foods</th>
                                <th>Status</th>
                                <th>Ordered At</th>
                                <th>View</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr>
                                    <td>{order.id}</td>
                                    <td>Rs. {order.totalAmount}</td>
                                    <td>{order.totalFoods}</td>
                                    <td>
                                        <p className={`badge badge-success`}>
                                            {order.status}
                                        </p>
                                    </td>
                                    <td>{order.createdAt}</td>
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