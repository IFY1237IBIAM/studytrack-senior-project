import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Basic validation
    if (!form.name || !form.email || !form.message) {
      setStatus("Please fill out all fields.");
      return;
    }

    // Mock submit (Sprint 2: UI only)
    setStatus("Thanks! Your message was submitted (mock).");
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <div className="page">
      <h1>Contact</h1>
      <p>Have a question or feedback? Send us a message.</p>

      <form onSubmit={handleSubmit} className="form">
        <label>
          Name
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
          />
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
          />
        </label>

        <label>
          Message
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Type your message..."
            rows={5}
          />
        </label>

        <button type="submit">Send Message</button>

        {status && <p style={{ marginTop: "1rem" }}>{status}</p>}
      </form>
    </div>
  );
}
