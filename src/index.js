import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const rootElement = document.getElementById("root");

ReactDOM.createRoot(rootElement).render(<App />);

// If you want your app to work offline and load faster, you can enable the service worker.
// Learn more about service workers: https://bit.ly/CRA-PWA
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js")
        .then(registration => {
            console.log("Service worker registered:", registration);
        })
        .catch(error => {
            console.error("Error registering service worker:", error);
        });
}
