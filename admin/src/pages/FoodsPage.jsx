import { useEffect } from "react"
import { useState } from "react"
import { MdEdit, MdDelete, MdAdd, MdCheckCircle, MdClose } from "react-icons/md"
import { Link } from "react-router-dom"
import { deleteData, getData } from "../utils/fetcher"

export default function FoodsPage() {
    const [foods, setFoods] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchFoods = async () => {
        const { data } = await getData("/foods")
        console.log(data);
        setFoods(data)
        setIsLoading(false)
        // setCategories(data)
        // setLoading(false)
    }

    const deleteFood = async (foodId) => {
        if(!window.confirm("Are you sure you want to delete ?")) return

        setIsLoading(true)
        await deleteData(`/foods/${foodId}`)
        setFoods(foods.filter(food => food.id !== foodId))
        setIsLoading(false)
    }

    useEffect(() => {
        fetchFoods()
    }, [])

    if(isLoading){
        return <div>Loading...</div>
    }

    return (
        <div className="card">
            <div className="card-header card-header-title">Foods</div>
            <div className="table">
                <table className="min-w-700">
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
                                <td>{food.price}</td>
                                <td>
                                    <img className="table-img" src={food.imgUrl} />
                                </td>
                                <td>{food.updatedAt}</td>
                                <td>
                                    {food.isVegan ? (
                                        <MdCheckCircle size={24} style={{ fill: "green" }} />
                                    ) : (
                                        <MdClose size={24} style={{ fill: "red" }} />
                                    )}
                                </td>
                                <td>
                                    {food.isFeatured ? (
                                        <MdCheckCircle size={24} style={{fill: "green"}} />
                                    ) : (
                                        <MdClose size={24} style={{fill: "red"}} />
                                    )}
                                </td>
                                <td>
                                    <Link
                                        to={`/foods/${food.id}`}
                                        className="btn btn-icon btn-primary"
                                    >
                                        <MdEdit size={24} />
                                    </Link>

                                    <button className="btn btn-icon btn-danger ml-1" onClick={() => deleteFood(food.id)}>
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