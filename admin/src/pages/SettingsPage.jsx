import { useEffect } from "react"
import { useState } from "react"
import { MdEdit } from "react-icons/md"
import { Link } from "react-router-dom"
import { getData } from "../utils/fetcher"

export default function SettingsPage() {
    const [settings, setSettings] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const fetchSettings = async () => {
        const { data } = await getData("/settings")
        setSettings(data)
        setIsLoading(false)
    }

    useEffect(() => {
        fetchSettings()
    }, [])

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div className="card">
            <div className="card-header card-header-title">Settings</div>
            <div className="table">
                <table className="min-w-700">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Value</th>
                            <th>Last Updated</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {settings.map(setting => (
                            <tr>
                                <td>{setting.name}</td>
                                <td>{setting.value}</td>
                                <td>{setting.updatedAt}</td>
                                <td>
                                    <Link
                                        to="/settings/edit"
                                        state={setting}
                                        className="btn btn-icon btn-primary"
                                    >
                                        <MdEdit size={24} />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}