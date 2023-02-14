import moment from "moment"
import { useEffect, useState } from "react"
import { MdDelete, MdEdit } from "react-icons/md"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import swal from "sweetalert"
import Loader from "../components/Loader"
import axios from "../utils/axios"

export default function CategoriesPage() {
    const [categories, setCategories] = useState([])
    const [isLoading, setIsLoading] = useState([])

    const fetchCategories = async () => {
        const { data } = await axios.get("/categories")
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

        await axios.delete(`/categories/${categoryId}`)

        setCategories(categories.filter(category => category.id !== categoryId))

        toast.success("Category deleted successfully")

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
            <p className="card-header card-title">Categories</p>
            <div className="table">
                <table style={{ minWidth: 700 }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
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
                                <td>
                                    <img style={{ height: 60, width: 60 }} src={category.imageUrl} />
                                </td>
                                <td>{moment(category.updatedAt).format("D MMM GG h:m A")}</td>
                                <td>
                                    <div className="table-btn-gap">
                                        <Link
                                            to="/categories/edit"
                                            className="btn btn-sm btn-primary"
                                            state={category}
                                        >
                                            <MdEdit size={24} />
                                        </Link>

                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => deleteCategory(category.id)}
                                        >
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