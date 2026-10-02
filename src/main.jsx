import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import DemoBadge from "./components/DemoBadge.jsx";
import { install } from "./demo/server.js";
import "./index.css";
import "./layout.css";
import "./extra.css";
import "./admin/admin.css";

// Demo build: the whole API runs inside the browser (no server needed).
install();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <DemoBadge />
    </BrowserRouter>
  </React.StrictMode>
);
