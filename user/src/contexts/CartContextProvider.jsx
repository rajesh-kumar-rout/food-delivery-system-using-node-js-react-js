import { createContext, useContext, useEffect, useState } from "react"

const CartContext = createContext()

export default function CartContextProvider({ children }) {
    const [state, setState] = useState({
        cartItems: [],
        totalPrice: 0
    })

    const setCartItems = async () => {
        setState({
            ...state,
            cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []
        })
    }

    const createCartItem = async (cartItem) => {
        const cartItems = [...state.cartItems, cartItem]

        setState({
            ...state,
            cartItems
        })
    }

    const setQuantity = async (key, quantity) => {
        const cartItems = [...state.cartItems]
        const itemIndex = state.cartItems.findIndex(cartItem => cartItem.key === key)
        cartItems[itemIndex].quantity = quantity

        setState({
            ...state,
            cartItems
        })
    }

    const deleteCartItem = async (key) => {
        const cartItems = state.cartItems.filter(cartItem => cartItem.key !== key)

        setState({
            ...state,
            cartItems
        })
    }

    const calculateTotalPrice = async () => {
        let totalPrice = 0

        state.cartItems.forEach(cartItem => totalPrice = totalPrice + cartItem.price)

        // setState({
        //     ...state
        // })
    }

    // useEffect(() => {
    //     setCartItems()
    // }, [])

    // useEffect(() => {
    //     calculateTotalPrice()
    // }, [state.cartItems])

    return (
        <CartContext.Provider
            value={{
                ...state,
                createCartItem,
                deleteCartItem,
                setQuantity
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export const useCartContext = () => useContext(CartContext)