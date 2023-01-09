import { MdEdit, MdDelete, MdAdd } from "react-icons/md"
import { Link } from "react-router-dom"
import { useEffect } from "react"
import { useState } from "react"
import { deleteData, getData } from "../utils/fetcher"

export default function DeliveryBoysPage() {
    const [deliveryBoys, setDeliveryBoys] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const fetchDeliveryBoys = async () => {
        const { data } = await getData("/delivery-boys")
        console.log(data);
        setDeliveryBoys(data)
    }

    const removeDeliveryBoy = async (deliveryBoyId) => {
        if(!window.confirm("Are you sure you want to delete ?")) return
        
        setIsLoading(true)
        await deleteData(`/delivery-boys/${deliveryBoyId}`)
        setDeliveryBoys(deliveryBoys.filter(deliveryBoy => deliveryBoy.id !== deliveryBoyId))
        setIsLoading(false)
    }

    useEffect(() => {
        fetchDeliveryBoys()
    }, [])

    if (isLoading) {
        return <div>Loading...</div>
    }
    return (
        <div className="card">
            <div className="card-header card-header-title">Delivery Boys</div>
            <div className="table">
                <table className="min-w-700">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Delivery Done</th>
                            <th>Created At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deliveryBoys.map(deliveryBoy => (
                            <tr>
                                <td>{deliveryBoy.id}</td>
                                <td>{deliveryBoy.name}</td>
                                <td>{deliveryBoy.email}</td>
                                <td>{deliveryBoy.mobile}</td>
                                <td>{deliveryBoy.totalDeliveryDone}</td>
                                <td>{deliveryBoy.createdAt}</td>
                                <td>
                                    <Link
                                        to="/categories/manage?id=2"
                                        className="btn btn-icon btn-primary"
                                    >
                                        <MdEdit size={24} />
                                    </Link>

                                    <button onClick={() => removeDeliveryBoy(deliveryBoy.id)} className="btn btn-icon btn-danger ml-1">
                                        <MdDelete size={24} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}