import { BrowserRouter } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "react-toastify/dist/ReactToastify.css"
import "./index.css"
import "styles/colors.css"
import "styles/reset.css"
import "styles/utils.css"
import "styles/demo.css"
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