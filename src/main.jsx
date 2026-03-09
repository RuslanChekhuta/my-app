import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import NetworkProvider from "./providers/NetworkProvider.jsx";
import LocalizationProvider from "./providers/LocalizationProvider.jsx";
import { registerServiceWorker } from "./helpers/registerServiceWorker.js";

registerServiceWorker();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LocalizationProvider>
      <NetworkProvider>
        <App />
      </NetworkProvider>
    </LocalizationProvider>
  </StrictMode>,
);
