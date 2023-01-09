import { useState } from "react";
import { useEffect } from "react";
import { MdDelete } from "react-icons/md"
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { deleteData, getData } from "../utils/fetcher"
import swal from "sweetalert"

export default function SlidersPage() {
    const [sliders, setSliders] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchSliders = async () => {
        const { data } = await getData("/sliders")
        setSliders(data)
        setIsLoading(false)
    }

    const deleteSlider = async (sliderId) => {
        const willDelete = await swal({
            title: "Are you sure?",
            text: "You want to delete this slider. This action can not be undone",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })

        if (!willDelete) return

        setIsLoading(true)

        const { status } = await deleteData(`/sliders/${sliderId}`)
        
        if(status === 200) {
            setSliders(sliders.filter(slider => slider.id !== sliderId))
            toast.success("Slider deleted successfully")
        }

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
                                    <img className="table-img" src={slider.imgUrl} />
                                </td>
                                <td>{slider.createdAt}</td>
                                <td>
                                    <button className="btn btn-icon btn-danger" onClick={e => deleteSlider(slider.id)}>
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