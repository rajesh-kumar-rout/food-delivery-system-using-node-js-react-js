import { useEffect, useState } from "react"
import { MdDelete } from "react-icons/md"
import swal from "sweetalert"
import axios from "../utils/axios"

export default function DeliveryAgentsPage() {
    const [deliveryAgents, setDeliveryBoys] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const fetchDeliveryBoys = async () => {
        const { data } = await axios.get("/delivery-agents")
     
        setDeliveryBoys(data)
    }

    const handleDeleteDeliveryAgent = async (deliveryBoyId) => {
        const willDelete = await swal({
            title: "Are you sure?",
            text: "Are you sure you want to delete?. This action can not be undone",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })

        if (!willDelete) return
        
        setIsLoading(true)

        await axios.delete(`/delivery-agents/${deliveryBoyId}`)
        
        setDeliveryBoys(deliveryAgents.filter(deliveryBoy => deliveryBoy.id !== deliveryBoyId))

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
                        {deliveryAgents.map(deliveryAgent => (
                            <tr key={deliveryAgent.id}>
                                <td>{deliveryAgent.id}</td>
                                <td>{deliveryAgent.name}</td>
                                <td>{deliveryAgent.email}</td>
                                <td>{deliveryAgent.mobile}</td>
                                <td>{deliveryAgent.totalDeliveryDone}</td>
                                <td>{deliveryAgent.createdAt}</td>
                                <td>
                                    <button onClick={() => handleDeleteDeliveryAgent(deliveryAgent.id)} className="btn btn-icon btn-danger ml-1">
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