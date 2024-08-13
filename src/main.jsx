import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

import "overlayscrollbars/overlayscrollbars.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter basename="/Life-Timer">
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
