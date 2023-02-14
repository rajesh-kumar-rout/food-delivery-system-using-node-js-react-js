import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./styles/reset.css"
import "./styles/variables.css"
import "./styles/index.css"
import App from "./App"

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
    <>
        <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
        />

        <BrowserRouter>
            <App />
        </BrowserRouter>
    </>
)