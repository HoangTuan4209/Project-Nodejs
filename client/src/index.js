import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { CartProvider } from "./components/pages/Cart/CartContext";

import RouterCustom from "./router";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CartProvider>
    <BrowserRouter>
      <RouterCustom />
    </BrowserRouter>
  </CartProvider>
);
