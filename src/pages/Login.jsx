import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // <-- useNavigate
import heroImage from "../assets/hero-banner.png";
import logo from "../assets/logo.png";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("Email and password are required.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Login is successful!");
        setForm({ email: "", password: "" });

        // Save user info and token
        localStorage.setItem("token", data.token);
        localStorage.setItem("userName", data.name);
        localStorage.setItem("userId", data.id);

        setTimeout(() => {
          if (data.role == "admin") {
            navigate("/admin-dashboard");
          } else {
            navigate("/dashboard");
          }
        }, 1500);
      } else {
        setError(data.message || "Invalid credentials.");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="login-full"
      style={{
        backgroundImage: `linear-gradient(rgba(11,28,45,.9), rgba(11,28,45,.95)), url(${heroImage})`,
      }}
    >
      <div className="login-wrapper">
        <img src={logo} alt="StudyTrack Logo" className="login-logo" />

        <h2 className="login-title">Sign in to your account</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}

          <button disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* REGISTER LINK */}
        <p className="login-register">
          Don’t have an account?{" "}
          <Link to="/register" className="register-link">
            Register here
          </Link>
        </p>
      </div>
    </section>
  );
}
