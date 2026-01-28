import { BrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout.jsx";
import "./css/style.css";

import MainLayout from "./layout/MainLayout";

import Hero from "./components/Hero";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes that use Header + Footer */}
        <Route element={<MainLayout />}>
          {/* Choose ONE home: Hero OR HomePage. I’m using Hero since you already have it. */}
          <Route path="/" element={<Hero />} />

          {/* If you prefer HomePage as the homepage, switch to: element={<HomePage />} */}
          {/* <Route path="/" element={<HomePage />} /> */}

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* Auth routes (no layout) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}


