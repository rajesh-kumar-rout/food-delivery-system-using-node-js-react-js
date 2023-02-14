import { Route, Routes } from "react-router-dom"
import Auth from "./components/Auth"
import Authenticated from "./components/Authenticated"
import Layout from "./components/Layout"
import CategoriesPage from "./pages/CategoriesPage"
import CreateCategoryPage from "./pages/CreateCategoryPage"
import CreateDelveryAgentPage from "./pages/CreateDeliveryAgentPage"
import CreateFoodPage from "./pages/CreateFoodPage"
import CreateSliderPage from "./pages/CreateSliderPage"
import CustomersPage from "./pages/CustomersPage"
import DeliveryAgentsPage from "./pages/DeliveryAgentsPage"
import EditCategoryPage from "./pages/EditCategoryPage"
import EditFoodPage from "./pages/EditFoodPage"
import EditSettingPage from "./pages/EditSettingPage"
import FoodsPage from "./pages/FoodsPage"
import HomePage from "./pages/HomePage"
import OrderDetailsPage from "./pages/OrderDetailsPage"
import OrdersPage from "./pages/OrdersPage"
import SettingsPage from "./pages/SettingsPage"
import SlidersPage from "./pages/SlidersPage"

export default function App() {
    return (
        <Auth>
            <Routes>
                <Route element={<Authenticated />}>
                    <Route element={<Layout />}>
                        <Route path="/admin" element={<HomePage />} />

                        <Route path="/admin/foods" element={<FoodsPage />} />
                        <Route path="/admin/foods/create" element={<CreateFoodPage />} />
                        <Route path="/admin/foods/edit" element={<EditFoodPage />} />

                        <Route path="/admin/categories" element={<CategoriesPage />} />
                        <Route path="/admin/categories/create" element={<CreateCategoryPage />} />
                        <Route path="/admin/categories/edit" element={<EditCategoryPage />} />

                        <Route path="/admin/delivery-agents" element={<DeliveryAgentsPage />} />
                        <Route path="/admin/delivery-agents/create" element={<CreateDelveryAgentPage />} />

                        <Route path="/admin/orders" element={< OrdersPage />} />
                        <Route path="/admin/orders/:orderId" element={<OrderDetailsPage />} />

                        <Route path="/admin/settings" element={<SettingsPage />} />
                        <Route path="/admin/settings/edit" element={<EditSettingPage />} />

                        <Route path="/admin/sliders" element={<SlidersPage />} />
                        <Route path="/admin/sliders/create" element={<CreateSliderPage />} />

                        <Route path="/admin/customers" element={<CustomersPage />} />
                    </Route>
                </Route>
            </Routes>
        </Auth>
    )
}