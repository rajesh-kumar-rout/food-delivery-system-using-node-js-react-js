import { useState } from "react"
import { MdClose } from "react-icons/md"
import { useEffect } from "react"
import { getData, patchData, postData } from "../utils/fetcher"
import { Formik, Form, Field, ErrorMessage, FieldArray, getIn } from 'formik'
import * as yup from 'yup'
import { getFormData } from "../utils/functions"
import { useRef } from "react"
import ArrayErrorMessage from "../components/ArrayErrorMessage"
import { useParams } from "react-router-dom"

const schema = yup.object().shape({
    name: yup.string()
        .trim()
        .required("Name is required")
        .min(2, "Name must be at least 2 character")
        .max(100, "Name must be within 100 characters"),

    price: yup.number()
        .typeError("Price is required")
        .required("Price is required")
        .positive()
        .integer(),

    desc: yup.string()
        .optional()
        .min(2, "Desc must be at least 2 character")
        .max(255, "Desc must be within 255 characters"),

    categoryId: yup.number()
        .required("Please select a category"),

    ingredients: yup.string()
        .required("Ingredient is required")
        .min(2, "Ingredient must be at least 2 character")
        .max(255, "Ingredient must be within 255 characters"),

    options: yup.array().of(
        yup.object().shape({
            name: yup.string().required("Name is required"),
            price: yup.number().typeError("Price is required").positive().required("Price is required")
        })
    )
})

export default function EditFoodPage() {
    const { foodId } = useParams()
    const [categories, setCategories] = useState([])
    const [food, setFood] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const imgRef = useRef()

    const fetchData = async () => {
        const { data: categories } = await getData("/categories")
        const { data: food } = await getData(`/foods/${foodId}`)
        setCategories(categories)
        setFood(food)
        console.log(food);
        setIsLoading(false)
    }

    const handleSubmit = async (values, { setSubmitting, resetForm, setErrors }) => {
        setSubmitting(true)
        const { status, data } = await patchData(`/foods/${foodId}`, getFormData(values))
        if (status === 409) {
            setErrors({ name: "Food already exists" })
        } else {
            console.log(data);
            alert("Food edited successfully")
            imgRef.current.value = ""
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

                        {values.options.length === 0 && (
                            <div className="form-group">
                                <label htmlFor="price" className="form-label">Price</label>
                                <Field
                                    type="number"
                                    id="price"
                                    className="form-control"
                                    name="price"
                                />
                                <ErrorMessage component="p" name="price" className="form-error" />
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="desc" className="form-label">Description</label>
                            <Field
                                id="desc"
                                className="form-control"
                                name="desc"
                                as="textarea"
                            />
                            <ErrorMessage component="p" name="desc" className="form-error" />
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
                            <label htmlFor="ingredients" className="form-label">Ingredients</label>
                            <Field
                                id="ingredients"
                                className="form-control"
                                name="ingredients"
                                as="textarea"
                            />
                            <ErrorMessage component="p" name="ingredients" className="form-error" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="img" className="form-label">Image</label>
                            <input
                                type="file"
                                id="img"
                                className="form-control"
                                name="img"
                                onChange={e => setFieldValue("img", e.target.files[0])}
                                accept=".jpg, .jpeg, .png"
                                ref={imgRef}
                            />
                        </div>

                        <FieldArray name="options">
                            {({ push, remove }) => (
                                <div className="form-group">
                                    {values.options.length > 0 && <label htmlFor="options" className="form-label">Options</label>}

                                    {values.options.map((option, index) => (
                                        <div className="manage-food-variant" key={option.key}>
                                            <div>
                                                <Field
                                                    type="text"
                                                    id="name"
                                                    className="form-control"
                                                    name={`options[${index}].name`}
                                                    placeholder="Name"
                                                />

                                                <ArrayErrorMessage name={`options[${index}].name`} />
                                            </div>

                                            <div>
                                                <Field
                                                    type="number"
                                                    id="price"
                                                    className="form-control"
                                                    name={`options[${index}].price`}
                                                    placeholder="Price"
                                                />

                                                <ArrayErrorMessage name={`options[${index}].price`} />
                                            </div>

                                            <button type="button" onClick={() => remove(index)}>
                                                <MdClose size={24} />
                                            </button>
                                        </div>
                                    ))}

                                    <button
                                        type="button"
                                        className="manage-food-btn-text"
                                        onClick={e => push({
                                            id: Math.random(),
                                            name: "",
                                            price: ""
                                        })}
                                    >
                                        Add Option
                                    </button>
                                </div>
                            )}
                        </FieldArray>

                        <div className="form-check">
                            <Field
                                type="checkbox"
                                id="isVegan"
                                className="form-check-input"
                                name="isVegan"
                                onChange={e => setFieldValue("isVegan", e.target.checked)}
                            />
                            <label htmlFor="isVegan">Vegan</label>
                        </div>

                        <div className="form-check">
                            <Field
                                type="checkbox"
                                id="isFeatured"
                                className="form-check-input"
                                name="isFeatured"
                                onChange={e => setFieldValue("isFeatured", e.target.checked)}
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