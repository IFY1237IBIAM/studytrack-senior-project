import { Routes, Route } from "react-router-dom";

import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Hero from "../components/Hero.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";

import Dashboard from "../pages/Dashboard.jsx"; // <-- added


export default function MainLayout() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* <-- added */}
      </Routes>

      <Footer />
    </>
  );
}
