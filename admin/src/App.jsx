import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import HomePage from "./pages/HomePage"
import FoodsPage from "./pages/FoodsPage"
import CategoriesPage from "./pages/CategoriesPage"
import DeliveryAgentsPage from "./pages/DeliveryBoysPage"
import OrdersPage from "./pages/OrdersPage"
import OrderDetailsPage from "./pages/OrderDetailsPage"
import SettingsPage from "./pages/SettingsPage"
import EditSettingPage from "./pages/EditSettingPage"
import SlidersPage from "./pages/SlidersPage"
import CustomersPage from "./pages/CustomersPage"
import CreateCategoryPage from "./pages/CreateCategoryPage"
import EditCategoryPage from "./pages/EditCategoryPage"
import CreateSliderPage from "./pages/CreateSliderPage"
import CreateDelveryBoyPage from "./pages/CreateDeliveryBoyPage"
import CreateFoodPage from "./pages/CreateFoodPage"
import EditFoodPage from "./pages/EditFoodPage"

export default function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/foods" element={<FoodsPage />} />
                <Route path="/foods/create" element={<CreateFoodPage />} />
                <Route path="/foods/:foodId" element={<EditFoodPage />} />
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/categories/create" element={<CreateCategoryPage />} />
                <Route path="/categories/edit" element={<EditCategoryPage />} />
                <Route path="/delivery-boys" element={<DeliveryAgentsPage />} />
                <Route path="/delivery-boys/create" element={<CreateDelveryBoyPage />} />
                <Route path="/orders" element={< OrdersPage />} />
                <Route path="/orders/:orderId" element={<OrderDetailsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/settings/edit" element={<EditSettingPage />} />
                <Route path="/sliders" element={<SlidersPage />} />
                <Route path="/sliders/create" element={<CreateSliderPage />} />
                <Route path="/customers" element={<CustomersPage />} />
            </Route>
        </Routes>
    )
}