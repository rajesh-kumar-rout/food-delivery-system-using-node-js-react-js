import { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import Loader from "components/Loader"
import axios from "utils/axios"
import { MdEdit, MdViewList, MdVisibility } from "react-icons/md"

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
                            {[1, 2, 3, 1, 4, 1, 1].map(e => (
                                <tr>
                                    <td>234</td>
                                    <td>Rs. 234</td>
                                    <td>4</td>
                                    <td>
                                        <p className={`badge ${e == 2 || e == 4 ? 'badge-success' : ''}`}>
                                            {e == 2 || e == 4 ? 'Pending' : 'Delivered'}
                                        </p>
                                    </td>
                                    <td>10:15 PM</td>
                                    <td>
                                        <Link to={`/order/${1}`} className="btn btn-primary btn-sm">
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