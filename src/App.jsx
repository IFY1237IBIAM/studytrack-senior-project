import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./css/style.css";

import MainLayout from "./layout/MainLayout.jsx";

import Hero from "./components/Hero";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes that use Header + Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Hero />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />

        </Route>

        {/* Auth routes (no Header/Footer) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
