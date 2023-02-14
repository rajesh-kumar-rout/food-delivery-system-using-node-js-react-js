import moment from "moment"
import { useEffect, useState } from "react"
import { MdCheckCircle, MdClose, MdDelete, MdEdit } from "react-icons/md"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import swal from "sweetalert"
import Loader from "../components/Loader"
import axios from "../utils/axios"
import { currency } from "../utils/functions"

export default function FoodsPage() {
    const [foods, setFoods] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchFoods = async () => {
        const { data } = await axios.get("/foods")

        setFoods(data)

        setIsLoading(false)
    }

    const handleDeleteFood = async (foodId) => {
        const willDelete = await swal({
            title: "Are you sure?",
            text: "Are you sure you want to delete?. This action can not be undone",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })

        if (!willDelete) return

        setIsLoading(true)

        await axios.delete(`/foods/${foodId}`)

        toast.success("Food deleted")

        setFoods(foods.filter(food => food.id !== foodId))

        setIsLoading(false)
    }

    useEffect(() => {
        fetchFoods()
    }, [])

    if (isLoading) {
        return <Loader/>
    }

    return (
        <div className="card">
            <p className="card-header card-title">Foods</p>
            <div className="table">
                <table style={{ minWidth: 700 }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>Last Updated</th>
                            <th>Vegan</th>
                            <th>Featured</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {foods.map(food => (
                            <tr>
                                <td>{food.id}</td>
                                <td>{food.name}</td>
                                <td>{currency.format(food.price)}</td>
                                <td>
                                    <img style={{ height: 60, width: 60 }} src={food.imageUrl} />
                                </td>
                                <td>{moment(food.updatedAt).format("D MMM GG h:m A")}</td>
                                <td>
                                    {food.isVegan ? (
                                        <MdCheckCircle size={24} style={{ fill: "green" }} />
                                    ) : (
                                        <MdClose size={24} style={{ fill: "red" }} />
                                    )}
                                </td>
                                <td>
                                    {food.isFeatured ? (
                                        <MdCheckCircle size={24} style={{ fill: "green" }} />
                                    ) : (
                                        <MdClose size={24} style={{ fill: "red" }} />
                                    )}
                                </td>
                                <td>
                                    <div className="table-btn-gap">
                                        <Link
                                            to="/foods/edit"
                                            state={food}
                                            className="btn btn-sm btn-primary"
                                        >
                                            <MdEdit size={24} />
                                        </Link>

                                        <button className="btn btn-sm btn-danger" onClick={() => handleDeleteFood(food.id)}>
                                            <MdDelete size={24} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}