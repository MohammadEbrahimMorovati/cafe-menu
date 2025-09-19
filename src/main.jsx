import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { CartProvider } from "./contexts/CartContext";
import AppRoutes from "./routes/routes";


createRoot(document.getElementById("root")).render(
  <StrictMode>
      <CartProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </CartProvider>
  </StrictMode>
);
