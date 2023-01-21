import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import * as yup from 'yup'
import axios from "../utils/axios"

const schema = yup.object().shape({
    name: yup.string()
        .trim()
        .required("Name is required")
        .max(30, "Name must be within 100 characters"),

    price: yup.number()
        .required("Price is required")
        .positive()
        .integer(),

    categoryId: yup.number().required("Please select a category")
})

export default function EditFoodPage() {
    const { foodId } = useParams()
    const [categories, setCategories] = useState([])
    const [food, setFood] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const fetchData = async () => {
        const [categoriesRes, foodRes] = await Promise.all([
            axios.get("/categories"),
            axios.get(`/foods/${foodId}`)
        ])

        setCategories(categoriesRes.data)

        setFood(foodRes.data)

        setIsLoading(false)
    }

    const handleSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true)

        try {
            await axios.patch(`/foods/${foodId}`, values)

            toast.success("Food edited successfully")

        } catch ({ response }) {
            
            response?.status === 409 && toast.error("Food already exists")
        }

        setSubmitting(false)
    }

    useEffect(() => {
        fetchData()
    }, [])

    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <Formik
            initialValues={food}
            validationSchema={schema}
            onSubmit={handleSubmit}
        >
            {({
                values,
                isSubmitting,
                setFieldValue
            }) => (

                <Form className="card form">
                    <div className="card-header card-header-title">Edit food</div>

                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="name" className="form-label">Name</label>
                            <Field
                                type="text"
                                id="name"
                                className="form-control"
                                name="name"
                            />
                            <ErrorMessage component="p" name="name" className="form-error" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="categoryId" className="form-label">Category</label>
                            <Field
                                id="categoryId"
                                className="form-control"
                                name="categoryId"
                                as="select"
                            >
                                <option></option>
                                {categories.map(category => (
                                    <option value={category.id}>{category.name}</option>
                                ))}
                            </Field>
                            <ErrorMessage component="p" name="categoryId" className="form-error" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="imageUrl" className="form-label">Image Url</label>
                            <Field
                                type="text"
                                id="imageUrl"
                                className="form-control"
                                name="imageUrl"
                            />
                        </div>

                        <div className="form-check">
                            <Field
                                type="checkbox"
                                id="isVegan"
                                className="form-check-input"
                                name="isVegan"
                                onChange={event => setFieldValue("isVegan", event.target.checked)}
                            />
                            <label htmlFor="isVegan">Vegan</label>
                        </div>

                        <div className="form-check">
                            <Field
                                type="checkbox"
                                id="isFeatured"
                                className="form-check-input"
                                name="isFeatured"
                                onChange={event => setFieldValue("isFeatured", event.target.checked)}
                            />
                            <label htmlFor="isFeatured">Featured</label>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn btn-primary"
                        >
                            {isSubmitting ? "Please wait..." : "Update"}
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}