// src/layout/Header.jsx
import { useState } from "react";
import { Link } from "react-router-dom"; // <- import Link
import logo from "../assets/logo.png";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <div className="container nav-wrapper">
        <img src={logo} alt="StudyTrack Logo" className="logo" />

        {/* HAMBURGER BUTTON */}
        <button
          className={`hamburger ${open ? "active" : ""}`}
          onClick={() => setOpen(!open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* NAVIGATION */}
        <nav className={`nav ${open ? "show" : ""}`}>
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setOpen(false)}>About</Link>
          <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
       <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
</nav>

      </div>
    </header>
  );
} 