import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { HashRouter } from "react-router-dom";
import "./index.css";

import "overlayscrollbars/overlayscrollbars.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <HashRouter basename="/Life-Timer">
            <App />
        </HashRouter>
    </React.StrictMode>
);
