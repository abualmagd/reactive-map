import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HashRouter, Route, Routes } from "react-router";
import Admin from "./admin.jsx";
//import ProtectedRoute from "./components/protectedRoute.jsx";
import Login from "./login.jsx";

createRoot(document.getElementById("root")).render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </HashRouter>
);
