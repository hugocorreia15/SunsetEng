import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "leaflet/dist/leaflet.css";
import "./styles.css";

/* Gates the scroll-reveal styles: without it every .reveal section would sit at
   opacity 0 for anyone whose JS fails to load. */
document.documentElement.classList.add("js-reveal");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
