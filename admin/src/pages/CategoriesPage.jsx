import { useEffect, useState } from "react"
import { MdEdit, MdDelete } from "react-icons/md"
import { Link } from "react-router-dom"
import Loader from "../components/Loader"
import { deleteData, getData } from "../utils/fetcher"
import swal from "sweetalert"
import { toast } from "react-toastify"

export default function CategoriesPage() {
    const [categories, setCategories] = useState([])
    const [isLoading, setIsLoading] = useState([])

    const fetchCategories = async () => {
        const { data } = await getData("/categories")
        setCategories(data)
        setIsLoading(false)
    }

    const deleteCategory = async (categoryId) => {
        const willDelete = await swal({
            title: "Are you sure?",
            text: "Deleting category will also delete all the foods under this category. This action can not be undone",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })

        if (!willDelete) return

        setIsLoading(true)

        const { status } = await deleteData(`/categories/${categoryId}`)

        if (status === 200) {
            setCategories(categories.filter(category => category.id !== categoryId))
            toast.success("Category deleted successfully")
        }
        setIsLoading(false)
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    if (isLoading) {
        return <Loader />
    }

    return (
        <div className="card">
            <div className="card-header card-header-title">Categories</div>
            <div className="table">
                <table className="min-w-700">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Total Foods</th>
                            <th>Image</th>
                            <th>Last Updated</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(category => (
                            <tr key={category.id}>
                                <td>{category.id}</td>
                                <td>{category.name}</td>
                                <td>{category.totalFoods}</td>
                                <td>
                                    <img className="table-img" src={category.imgUrl} />
                                </td>
                                <td>{category.updatedAt}</td>
                                <td>
                                    <Link
                                        to="/categories/edit"
                                        className="btn btn-icon btn-primary"
                                        state={category}
                                    >
                                        <MdEdit size={24} />
                                    </Link>

                                    <button
                                        className="btn btn-icon btn-danger ml-1"
                                        onClick={() => deleteCategory(category.id)}
                                    >
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