import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import CardContextProvider from "./context/ContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CardContextProvider>
      <App />
    </CardContextProvider>
  </React.StrictMode>
);
