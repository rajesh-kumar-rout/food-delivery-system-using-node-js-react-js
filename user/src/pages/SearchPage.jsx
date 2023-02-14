import { useEffect, useState } from "react"
import { MdSearch } from "react-icons/md"
import { useSearchParams } from "react-router-dom"
import Food from "../components/Food"
import Loader from "../components/Loader"
import axios from "../utils/axios"

export default function SearchPage() {
    const [queries, setQueries] = useSearchParams()
    const query = queries.get("query") ?? ""

    const [isFetching, setIsFetching] = useState(true)
    const [categories, setCategories] = useState([])
    const [foods, setFoods] = useState([])
    const [filteredFoods, setFilteredFoods] = useState([])

    const fetchData = async () => {
        const [categoriesRes, foodsRes] = await Promise.all([
            axios.get("/categories"),
            axios.get("/foods")
        ])

        setCategories(categoriesRes.data)

        setFoods(foodsRes.data)

        setIsFetching(false)
    }

    const filterFoods = async () => {
        const filteredFoods = foods.filter(
            food => food.name.toLowerCase().includes(query.toLowerCase()) ||
                food.category.name.toLowerCase().includes(query.toLowerCase())
        )

        setFilteredFoods(filteredFoods)
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        filterFoods()
    }, [queries, foods])

    if (isFetching) {
        return <Loader />
    }

    return (
        <div>
            <form className="search-input">
                <MdSearch size={24} />
                <input
                    type="search"
                    value={query}
                    className="form-control"
                    style={{ border: "none" }}
                    onChange={event => setQueries(`query=${event.target.value}`)}
                    placeholder="Search food here..."
                />
            </form>

            <div className="search-result">
                {query?.length ? (filteredFoods.length === 0 ? "No Food Found" : "Search Results") : "Top Categories"}
            </div>

            {query.length > 0 ? (
                <div className="search-foods">
                    {filteredFoods.map(food => (
                        <Food
                            key={food.id}
                            food={food}
                        />
                    ))}
                </div>
            ) : (
                <div className="search-categories">
                    {categories.map(category => (
                        <div key={category.id} className="category" onClick={() => setQueries(`query=${category.name}`)}>
                            <img src={category.imageUrl} />
                            <p className="category-name">{category.name}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}