import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      setError("All fields are required.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5001/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setSuccess("Message sent successfully!");
        setForm({ name: "", email: "", message: "" });
      } else {
        setError("Failed to send message. Try again.");
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
      className="contact-full"
      style={{
        backgroundColor: "#ffffff",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
      }}
    >
      <div
        className="contact-wrapper"
        style={{
          maxWidth: "600px",
          width: "100%",
          backgroundColor: "#f9f9f9",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        {/* --- Intro Text --- */}
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h2 style={{ fontSize: "2.4rem", marginBottom: "12px" }}>Get in Touch</h2>
          <p style={{ fontSize: "1.6rem", color: "#555" }}>
            Have a question or need help? Fill out the form below and our team will get back to you as soon as possible.
          </p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            style={{
              width: "100%",
              padding: "16px",
              fontSize: "1.6rem",
              marginBottom: "20px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />

          <input
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            style={{
              width: "100%",
              padding: "16px",
              fontSize: "1.6rem",
              marginBottom: "20px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />

          <textarea
            placeholder="Your Message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            rows="8"
            style={{
              width: "100%",
              padding: "16px",
              fontSize: "1.6rem",
              marginBottom: "20px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              resize: "vertical",
            }}
          />

          {error && (
            <p style={{ color: "red", marginBottom: "16px", fontSize: "1.4rem" }}>
              {error}
            </p>
          )}
          {success && (
            <p style={{ color: "green", marginBottom: "16px", fontSize: "1.4rem" }}>
              {success}
            </p>
          )}

          {/* --- Send Message Button with Login Color --- */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "18px",
              fontSize: "1.8rem",
              backgroundColor: "#e33a27", // login button color
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "0.25s ease",
            }}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
}
