import { MdSearch } from "react-icons/md"
import { useState } from "react"
import { useEffect } from "react"
import Food from "components/Food"
import Loader from "components/Loader"
import axios from "utils/axios"

export default function SearchPage() {
    const [query, setQuery] = useState("")
    const [isFetching, setIsFetching] = useState(true)
    const [categories, setCategories] = useState([])
    const [foods, setFoods] = useState([])
    const [filteredFoods, setFilteredFoods] = useState([])

    const fetchData = async () => {
        const categoriesRes = await axios.get("/categories")
        const foodsRes = await axios.get("/foods")
        setCategories(categoriesRes.data)
        setFoods(foodsRes.data)
        setIsFetching(false)
    }

    const filterFoods = async () => {
        const filteredFoods = foods.filter(food => food.name.toLowerCase().includes(query.toLowerCase()) ||
            food.categoryName.toLowerCase().includes(query.toLowerCase()))
        setFilteredFoods(filteredFoods)
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        filterFoods()
    }, [query])

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
                    className="form-control border-none" 
                    onChange={event => setQuery(event.target.value)}
                    placeholder="Search food here..."
                />
            </form>

            <div className="search-result">
                {query.length ? "Search Results" : "Top Categories"}
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
                        <div className="category" onClick={() => setQuery(category.name)}>
                            <img src={category.imgUrl} />
                            <p className="category-name">{category.name}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}