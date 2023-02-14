import moment from "moment"
import { useEffect, useState } from "react"
import { MdDelete } from "react-icons/md"
import swal from "sweetalert"
import Loader from "../components/Loader"
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
        return <Loader/>
    }
    
    return (
        <div className="card">
            <p className="card-header card-title">Delivery Boys</p>
            <div className="table">
                <table style={{minWidth: 700}}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
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
                                <td>{moment(deliveryAgent.createdAt).format("D MMM GG h:m A")}</td>
                                <td>
                                    <button onClick={() => handleDeleteDeliveryAgent(deliveryAgent.id)} className="btn btn-sm btn-danger ml-1">
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