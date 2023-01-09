import { Field, getIn } from "formik"

export default function ArrayErrorMessage({ name }) {
    <Field
        render={({ form }) => {
            const error = getIn(form.errors, name)
            const touch = getIn(form.touched, name)
            return touch && error ? <p className="form-error">{error}</p> : null
        }}
    />
}
