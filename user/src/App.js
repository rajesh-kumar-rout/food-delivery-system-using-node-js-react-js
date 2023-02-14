import Auth from "./components/Auth"
import Authenticated from "./components/Authenticated"
import Layout from "./components/Layout"
import UnAuthenticated from "./components/UnAuthenticated"
import CartPage from "./pages/CartPage"
import CheckoutPage from "./pages/CheckoutPage"
import EditProfilePage from "./pages/EditProfilePage"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import OrderDetailsPage from "./pages/OrderDetailsPage"
import OrdersPage from "./pages/OrdersPage"
import RegisterPage from "./pages/RegisterPage"
import SearchPage from "./pages/SearchPage"
import { Route, Routes } from "react-router-dom"

export default function App() {
    return (
        <Auth>
            <Routes>
                <Route element={<Layout />}>
                    <Route index element={<HomePage />} />

                    <Route path="/search" element={<SearchPage />} />

                    <Route element={<UnAuthenticated />}>
                        <Route path="/auth/login" element={<LoginPage />} />

                        <Route path="/auth/register" element={<RegisterPage />} />
                    </Route>

                    <Route element={<Authenticated />}>
                        <Route path="/cart" element={<CartPage />} />

                        <Route path="/auth/orders" element={<OrdersPage />} />

                        <Route path="/auth/orders/:orderId" element={<OrderDetailsPage />} />

                        <Route path="/checkout" element={<CheckoutPage />} />

                        <Route path="/auth/edit-profile" element={<EditProfilePage />} />
                    </Route>

                </Route>
            </Routes>
        </Auth>
    )
}