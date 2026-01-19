import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // <-- useNavigate
import heroImage from "../assets/hero-banner.png";
import logo from "../assets/logo.png";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // <-- navigation

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("Email and password are required.");
      return;
    }

    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess("Login is successful!");
      setForm({ email: "", password: "" });

      // Redirect to Dashboard
      navigate("/dashboard");
    }, 2000);
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
