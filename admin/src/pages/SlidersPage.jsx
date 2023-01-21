import { useEffect, useState } from "react"
import { MdDelete } from "react-icons/md"
import { toast } from "react-toastify"
import swal from "sweetalert"
import Loader from "../components/Loader"
import axios from "../utils/axios"

export default function SlidersPage() {
    const [sliders, setSliders] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchSliders = async () => {
        const { data } = await axios.get("/sliders")

        setSliders(data)

        setIsLoading(false)
    }

    const handleDeleteSlider = async (sliderId) => {
        const willDelete = await swal({
            title: "Are you sure?",
            text: "You want to delete this slider. This action can not be undone",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })

        if (!willDelete) return

        setIsLoading(true)

        await axios.delete(`/sliders/${sliderId}`)
        
        setSliders(sliders.filter(slider => slider.id !== sliderId))
        
        toast.success("Slider deleted successfully")

        setIsLoading(false)
    }

    useEffect(() => {
        fetchSliders()
    }, [])

    if (isLoading) {
        return <Loader/>
    }

    return (
        <div className="card">
            <div className="card-header card-header-title">Sliders</div>
            <div className="table">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Image</th>
                            <th>Created At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sliders.map(slider => (
                            <tr>
                                <td>{slider.id}</td>
                                <td>
                                    <img className="table-img" src={slider.imageUrl} />
                                </td>
                                <td>{slider.createdAt}</td>
                                <td>
                                    <button className="btn btn-icon btn-danger" onClick={e => handleDeleteSlider(slider.id)}>
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