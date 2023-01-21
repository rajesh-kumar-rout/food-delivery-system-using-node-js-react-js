import { useEffect, useState } from "react"
import { MdVisibility } from "react-icons/md"
import { Link } from "react-router-dom"
import Loader from "../components/Loader"
import axios from "../utils/axios"

export default function OrdersPage() {
    const [orders, setOrders] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchOrders = async () => {
        const { data } = await axios.get("/orders")

        setOrders(data)

        setIsLoading(false)
    }

    useEffect(() => {
        fetchOrders()
    }, [])

    if(isLoading){
        return <Loader/>
    }

    return (
        <div className="card">
            <div className="card-header card-header-title">Orders</div>
            <div className="table">
                <table className="min-w-700">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Mobile</th>
                            <th>Total Amount</th>
                            <th>Status</th>
                            <th>Placed At</th>
                            <th>View</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.mobile}</td>
                                <td>{order.totalAmount}</td>
                                <td>
                                    <span>{order.status}</span>
                                </td>
                                <td>{order.createdAt}</td>
                                <td>
                                    <Link className="btn btn-icon btn-primary" to={`/orders/${order.id}`}>
                                        <MdVisibility size={24} />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}