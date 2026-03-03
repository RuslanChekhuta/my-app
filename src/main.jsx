import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App/App";
import SearchItemWithTransition from "./components/SearchItemWithTransition";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
    <SearchItemWithTransition />
  </StrictMode>,
);
