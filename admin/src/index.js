import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import App from "./App"
import "./styles/index.css"
import "./styles/reset.css"
import "./styles/variables.css"

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