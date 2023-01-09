import { BrowserRouter } from "react-router-dom"
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { ToastContainer } from "react-toastify"
import "./index.scss"
import "react-toastify/dist/ReactToastify.css"

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
    <>
        <ToastContainer
            position="bottom-left"
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