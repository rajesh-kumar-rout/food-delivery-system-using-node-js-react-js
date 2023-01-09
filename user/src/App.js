import { Routes, Route } from "react-router-dom"
import { Authenticated, NotAuthenticated } from "components/Auth"
import ChangePasswordPage from "pages/ChangePasswordPage"
import RegisterPage from "pages/RegisterPage"
import EditAccountPage from "pages/EditAccountPage"
import HomePage from "pages/HomePage"
import LoginPage from "pages/LoginPage"
import SearchPage from "pages/SearchPage"
import CartContextProvider from "contexts/CartContextProvider"
import AuthContextProvider from "contexts/AuthContextProvider"
import CheckoutPage from "pages/CheckoutPage"
import MasterLayout from "components/Layout"
import CartPage from "pages/CartPage"
import OrdersPage from "pages/OrdersPage"
import OrderDetailsPage from "pages/OrderDetails"

export default function App() {
    return (
        <AuthContextProvider>
            <CartContextProvider>

                <Routes>

                    <Route element={<MasterLayout />}>
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/orders" element={<OrdersPage />} />
                        <Route path="/order/:orderId" element={<OrderDetailsPage />} />

                        <Route index element={<HomePage />} />
                        <Route path="/search" element={<SearchPage />} />
                        <Route element={<NotAuthenticated />}>
                            <Route path="/auth/login" element={<LoginPage />} />
                            <Route path="/auth/register" element={<RegisterPage />} />
                        </Route>
                        <Route element={<Authenticated />}>
                        <Route path="/auth/orders" element={<OrdersPage />} />

                            <Route path="/checkout" element={<CheckoutPage />} />
                            <Route path="/auth/change-password" element={<ChangePasswordPage />} />
                            <Route path="/auth/edit-account" element={<EditAccountPage />} />
                        </Route>
                    </Route>
                </Routes>
            </CartContextProvider>
        </AuthContextProvider>
    )
}