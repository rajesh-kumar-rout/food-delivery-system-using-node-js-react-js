
import { useState } from "react"
import { useLocation, useSearchParams } from "react-router-dom"
import { patchData } from "../utils/fetcher"

export default function EditSettingPage() {
    const { state } = useLocation()
    const [value, setValue] = useState(state.value)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async e => {
        e.preventDefault()

        setIsLoading(true)
        await patchData(`/settings/${state.id}`, { value })
        alert("Setting edited successfully")
        setIsLoading(false)
    }

    return (
        <form className="card form" onSubmit={handleSubmit}>
            <h2 className="card-header card-header-title">Change Setting</h2>

            <div className="card-body">
                <div className="form-group">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        id="name"
                        className="form-control"
                        name="name"
                        value={state.name}
                        disabled
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="value" className="form-label">Value</label>
                    <input
                        type="number"
                        id="value"
                        name="value"
                        className="form-control"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="btn btn-primary btn-full"
                >
                    {isLoading ? "Please wait..." : "Save"}
                </button>
            </div>
        </form>
    )
}