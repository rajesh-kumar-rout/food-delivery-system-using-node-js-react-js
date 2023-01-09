import { useState } from "react"
import { useEffect } from "react"
import { MdEdit, MdDelete, MdVisibility, MdArrowBackIos, MdArrowForward, MdArrowBack, MdAdd } from "react-icons/md"
import { Link } from "react-router-dom"
import Loader from "../components/Loader"
import { getData } from "../utils/fetcher"

export default function OrdersPage() {
    const [orders, setOrders] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchOrders = async () => {
        const { data } = await getData("/orders")
        setOrders(data.orders)
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
                            <th>Tracking ID</th>
                            <th>Mobile</th>
                            <th>Amount Paid</th>
                            <th>Status</th>
                            <th>Placed At</th>
                            <th>View</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.trackingId}>
                                <td>{order.trackingId}</td>
                                <td>{order.mobile}</td>
                                <td>{order.amountPayable}</td>
                                <td>
                                    <span>{order.status}</span>
                                </td>
                                <td>{order.placedAt}</td>
                                <td>
                                    <Link className="btn btn-icon btn-primary" to={`/orders/${order.trackingId}`}>
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