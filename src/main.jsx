import React from "react";
import { createRoot } from "react-dom/client";
import WorldForge from "./WorldForge";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WorldForge />
  </React.StrictMode>,
);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("/sw.js").catch(() => {}));
}
