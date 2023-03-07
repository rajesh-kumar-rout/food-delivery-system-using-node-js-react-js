import moment from "moment"
import { useEffect, useState } from "react"
import { MdEdit } from "react-icons/md"
import { Link } from "react-router-dom"
import Loader from "../components/Loader"
import axios from "../utils/axios"
import { currency } from "../utils/functions"

export default function SettingsPage() {
    const [settings, setSettings] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const fetchSettings = async () => {
        const { data } = await axios.get("/settings")

        setSettings(data)

        setIsLoading(false)
    }

    useEffect(() => {
        fetchSettings()
    }, [])

    if (isLoading) {
        return <Loader/>
    }

    return (
        <div className="card">
            <p className="card-header card-title">Settings</p>
            <div className="table">
                <table style={{minWidth: 700}}>
                    <thead>
                        <tr>
                            <th>Delivery Fee</th>
                            <th>Gst Percentage</th>
                            <th>Last Updated</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{currency.format(settings.deliveryFee)}</td>
                            <td>{settings.gstPercentage}</td>
                            <td>{moment(settings.updatedAt).format("D MMM GG h:m A")}</td>
                            <td>
                                <Link
                                    to="/admin/settings/edit"
                                    className="btn btn-sm btn-primary"
                                >
                                    <MdEdit size={24} />
                                </Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}