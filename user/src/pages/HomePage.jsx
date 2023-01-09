import { Carousel } from "react-responsive-carousel"
import { useEffect, useState } from "react"
import Loader from "components/Loader"
import Food from "components/Food"
import axios from "utils/axios"
import "react-responsive-carousel/lib/styles/carousel.min.css"

export default function HomePage() {
    const [sliders, setSliders] = useState([])
    const [foods, setFoods] = useState([])
    const [isFetching, setIsFetching] = useState(true)

    const fetchData = async () => {
        const slidersRes = await axios.get("/sliders")
        const foodsRes = await axios.get("/foods/featured")
        setSliders(slidersRes.data)
        setFoods(foodsRes.data)
        setIsFetching(false)
    }

    useEffect(() => {
        fetchData()
    }, [])

    if (isFetching) {
        return <Loader />
    }

    return (
        <div className="home">
            <Carousel autoPlay={true} interval={2000} infiniteLoop stopOnHover={true}>
                <div>
                    <img src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22895%22%20height%3D%22250%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20895%20250%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_184ddf36118%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A45pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_184ddf36118%22%3E%3Crect%20width%3D%22895%22%20height%3D%22250%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22332.3874969482422%22%20y%3D%22145.160001373291%22%3E895x250%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" />
                </div>
                <div>
                    <img src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22895%22%20height%3D%22250%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20895%20250%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_184ddf36118%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A45pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_184ddf36118%22%3E%3Crect%20width%3D%22895%22%20height%3D%22250%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22332.3874969482422%22%20y%3D%22145.160001373291%22%3E895x250%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" />
                </div>
                <div>
                    <img src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22895%22%20height%3D%22250%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20895%20250%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_184ddf36118%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A45pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_184ddf36118%22%3E%3Crect%20width%3D%22895%22%20height%3D%22250%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22332.3874969482422%22%20y%3D%22145.160001373291%22%3E895x250%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" />
                </div>
            </Carousel>

            <h2 className="home-title">Our Items</h2>

            <div className="home-foods">
                
                {foods.map(food => (
                    <Food
                        key={food.id}
                        food={food}
                    />
                ))}
            </div>
        </div>
    )
}