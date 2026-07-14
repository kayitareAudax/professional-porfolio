import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { HomePage } from "./app/pages/HomePage";
import { AdminPage } from "./app/pages/AdminPage";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  </BrowserRouter>
);