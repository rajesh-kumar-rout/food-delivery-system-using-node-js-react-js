import moment from "moment"
import { useEffect } from "react"
import { useState } from "react"
import axios from "../utils/axios"

export default function CustomersPage() {
    const [customeres, setCustomers] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const fetchCustomers = async () => {
        const { data } = await axios.get("/customers")
        setCustomers(data)
    }

    useEffect(() => {
        fetchCustomers()
    }, [])

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div className="card">
            <div className="card-header card-header-title">Customers</div>
            <div className="table">
                <table className="min-w-700">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customeres.map(customer => (
                            <tr>
                                <td>{customer.id}</td>
                                <td>{customer.name}</td>
                                <td>{customer.email}</td>
                                <td>{moment(customer.createdAt).format("D MMM GG h:m A")}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}