import { postData } from "../utils/fetcher"
import { Formik, Form, ErrorMessage, Field } from "formik"
import * as yup from "yup"
import { useRef } from "react"
import { getFormData } from "../utils/functions"
import {toast} from "react-toastify"

const schema = yup.object().shape({
    name: yup.string()
        .trim()
        .min(2, "Name must be at least 2 characters")
        .max(30, "Name must be within 30 characters")
        .required("Name is required")
})

export default function CreateCategoryPage() {
    const imgRef = useRef()

    const handleSubmit = async (values, { resetForm, setSubmitting, setErrors }) => {
        setSubmitting(true)

        const { status } = await postData("/categories", getFormData(values))

        if (status === 201) {
            resetForm()
            imgRef.current.value = ""
            toast.success("Category created successfully")
        }

        if (status === 409) {
            toast.error("Category already exists")
        }

        setSubmitting(false)
    }

    return (
        <Formik
            initialValues={{
                name: "",
                img: null
            }}
            validationSchema={schema}
            onSubmit={handleSubmit}
        >
            {({ values, isSubmitting, setFieldValue, handleBlur }) => (
                <Form className="card form">
                    <h2 className="card-header card-header-title">Create Category</h2>

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
                            <label htmlFor="img" className="form-label">Image</label>
                            <input
                                type="file"
                                id="img"
                                className="form-control"
                                name="img"
                                onChange={e => setFieldValue("img", e.target.files[0])}
                                onBlur={handleBlur}
                                accept=".jpg, .jpeg, .png"
                                required
                                ref={imgRef}
                            />
                            {values.img && <img className="form-img-preview" src={URL.createObjectURL(values.img)} />}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn btn-primary"
                        >
                            {isSubmitting ? "Please wait..." : "Save"}
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}