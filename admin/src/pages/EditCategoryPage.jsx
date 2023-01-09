import { patchData } from "../utils/fetcher"
import { Formik, Form, ErrorMessage, Field } from "formik"
import * as yup from "yup"
import { useRef } from "react"
import { getFormData } from "../utils/functions"
import { useLocation } from "react-router-dom"

const schema = yup.object().shape({
    name: yup.string()
        .trim()
        .min(2, "Name must be at least 2 characters")
        .max(30, "Name must be within 30 characters")
        .required("Name is required")
})

export default function EditCategoryPage() {
    const { state } = useLocation()
    const imgRef = useRef()

    const handleSubmit = async (values, { resetForm, setSubmitting, setErrors }) => {
        setSubmitting(true)
        const { status } = await patchData(`/categories/${state.id}`, getFormData(values))
        if (status === 409) {
            setErrors({ name: "Category already exists" })
        } else {
            imgRef.current.value = ""
        }
        setSubmitting(false)
    }

    return (
        <Formik
            initialValues={state}
            validationSchema={schema}
            onSubmit={handleSubmit}
        >
            {({ values, isSubmitting, setFieldValue, handleBlur }) => (
                <Form className="card form">
                    <h2 className="card-header card-header-title">Edit Category</h2>

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
                                ref={imgRef}
                            />
                            {values.img ? (
                                <img className="form-img-preview" src={URL.createObjectURL(values.img)} />
                            ) : (
                                <img className="form-img-preview" src={values.imgUrl} />
                            )}
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