import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import heroImage from "../assets/hero-banner.png";
import logo from "../assets/logo.png";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
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
      const response = await fetch("https://studytrack-senior-project-1.onrender.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        setForm({ email: "", password: "" });

        // Save user info and token
        localStorage.setItem("token", data.token);
        localStorage.setItem("userName", data.name);
        localStorage.setItem("userId", data.id);
        localStorage.setItem("role", data.role || "user");


        // Show success interface
        setSuccess(true);

        setTimeout(() => {
          const role = data.role || "user";
          if (role === "admin") {
            navigate("/admin/dashboard");
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

  /* ================= SUCCESS SCREEN ================= */
  if (success) {
    return (
      <section className="login-success-screen">
        <div className="success-box">
          <div className="success-check">
            ✓
          </div>
          <h2>Login successful</h2>
          <p>Redirecting to dashboard...</p>
        </div>
      </section>
    );
  }

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

          <button disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

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
