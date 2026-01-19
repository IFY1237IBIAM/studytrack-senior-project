import { Routes, Route } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import Hero from "../components/Hero";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Contact from "../pages/Contact";
import Dashboard from "../pages/Dashboard"; // <-- added

export default function MainLayout() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* <-- added */}
      </Routes>

      <Footer />
    </>
  );
}
