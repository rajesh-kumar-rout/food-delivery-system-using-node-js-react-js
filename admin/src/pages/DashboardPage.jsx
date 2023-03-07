import { useEffect, useState } from "react"
import Loader from "../components/Loader"
import axios from "../utils/axios"

export default function DashboardPage() {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchData = async () => {
        const { data } = await axios.get("/analytics")

        setData(data)

        setIsLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [])

    if(isLoading){
        return <Loader/>
    }

    return (
        <div className="home">
            <div className="home-card">
                <h1 className="home-count">{data.totalFoods}</h1>
                <p className="home-label">Total Foods</p>
            </div>
            <div className="home-card">
                <h1 className="home-count">{data.totalCategories}</h1>
                <p className="home-label">Total Category</p>
            </div>
            <div className="home-card">
                <h1 className="home-count">{data.totalSliders}</h1>
                <p className="home-label">Total Sliders</p>
            </div>
            <div className="home-card">
                <h1 className="home-count">{data.totalPreparingOrders}</h1>
                <p className="home-label">Total Preparing Orders</p>
            </div>
            <div className="home-card">
                <h1 className="home-count">{data.totalOrders}</h1>
                <p className="home-label">Total Orders</p>
            </div>
            <div className="home-card">
                <h1 className="home-count">{data.totalDeliveredOrders}</h1>
                <p className="home-label">Total Delivered Orders</p>
            </div>
        </div>
    )
}