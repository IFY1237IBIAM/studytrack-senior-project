import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import heroImage from "../assets/hero-bg.jpg";
import logo from "../assets/logo.png";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      setError("All fields are required.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch("https://studytrack-senior-project-1.onrender.com/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        setForm({ name: "", email: "", password: "" });

        // Save user info and token
        localStorage.setItem("token", data.token);
        localStorage.setItem("userName", data.name);
        localStorage.setItem("userId", data.id);

        // Show success interface
        setSuccess(true);

        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        setError(data.message || "Registration failed.");
      }
    } catch (err) {
      console.error(err);
      setError("Server error completely. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  /* ================= SUCCESS SCREEN ================= */
  if (success) {
    return (
      <section className="login-success-screen">
        <div className="success-box">
          <div className="success-check">✓</div>
          <h2>Registration successful</h2>
          <p>Setting up your dashboard...</p>
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

        <h2 className="login-title">Create a new account</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
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
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="login-register">
          Already have an account?{" "}
          <Link to="/login" className="register-link">
            Login here
          </Link>
        </p>
      </div>
    </section>
  );
}
