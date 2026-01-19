import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // <-- useNavigate
import heroImage from "../assets/hero-bg.jpg";
import logo from "../assets/logo.png";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // <-- navigation

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      setError("All fields are required.");
      return;
    }

    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess("Registration successful!");
      setForm({ name: "", email: "", password: "" });

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
          {success && <p className="success-message">{success}</p>}

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
