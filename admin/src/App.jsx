import { Route, Routes } from "react-router-dom"
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
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />

                <Route path="/foods" element={<FoodsPage />} />
                <Route path="/foods/create" element={<CreateFoodPage />} />
                <Route path="/foods/:foodId" element={<EditFoodPage />} />

                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/categories/create" element={<CreateCategoryPage />} />
                <Route path="/categories/edit" element={<EditCategoryPage />} />

                <Route path="/delivery-agents" element={<DeliveryAgentsPage />} />
                <Route path="/delivery-agents/create" element={<CreateDelveryAgentPage />} />

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