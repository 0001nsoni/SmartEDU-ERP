import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import { LoadScript } from "@react-google-maps/api";

ReactDOM.createRoot(document.getElementById("root")).render(
  <LoadScript
    googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY}
    libraries={["places"]}
  >

  <React.StrictMode>
    <AuthProvider>
      <Toaster position="top-right" />
      <App />
    </AuthProvider>
  </React.StrictMode>
  </LoadScript>
);
