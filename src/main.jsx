import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App/App";

import Form from "./components/Form";
import AccessibilityComponent from "./components/AccessibilityComponents";
import AccessibleForms from "./components/AccessibleForms";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
    {/* <AccessibilityComponent /> */}
    {/* <Form /> */}
    <AccessibleForms />
  </StrictMode>,
);
