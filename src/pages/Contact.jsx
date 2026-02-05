// src/pages/Contact.jsx
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    company: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.fullName || !form.email || !form.message) {
      setStatus("Please fill out Full Name, Email, and Message.");
      return;
    }

    setStatus("Message sent! (Demo mode)");
    setForm({ fullName: "", email: "", company: "", message: "" });
  };

  return (
    <main className="contact-page">
      <div className="container contact-grid">
        {/* LEFT */}
        <section className="contact-left">
          <p className="contact-kicker">CONTACT US</p>
          <h1 className="contact-title">Get in touch today</h1>

          <p className="contact-lead">
            We love questions and feedback — and we’re always happy to help!
            Here are some ways to contact us.
          </p>

          <div className="contact-cards">
            <div className="contact-card">
              <div className="contact-icon">✉️</div>
              <div>
                <p className="contact-card__label">Email:</p>
                <p className="contact-card__value">contact@studytrack.com</p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon">📞</div>
              <div>
                <p className="contact-card__label">Phone</p>
                <p className="contact-card__value">(123) 123-3213-23</p>
              </div>
            </div>
          </div>

          <div className="contact-social">
            <p className="contact-social__label">Reach out to us on:</p>
            <div className="contact-social__icons">
              <span className="social-btn" aria-label="Facebook">f</span>
              <span className="social-btn" aria-label="X">x</span>
              <span className="social-btn" aria-label="Instagram">◎</span>
              <span className="social-btn" aria-label="LinkedIn">in</span>
            </div>
          </div>
        </section>

        {/* RIGHT */}
        <section className="contact-right">
          <form className="contact-formCard" onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Your name"
              />
            </div>

            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Your email address"
              />
            </div>

            <div className="form-field">
              <label htmlFor="company">Company (optional)</label>
              <input
                id="company"
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="Company name"
              />
            </div>

            <div className="form-field">
              <label htmlFor="message">Leave us a message</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                value={form.message}
                onChange={handleChange}
                placeholder="Write your message here..."
              />
            </div>

            <button className="contact-submit" type="submit">
              Send Message
            </button>

            {status && <p className="contact-status">{status}</p>}
          </form>
        </section>
      </div>
    </main>
  );
}
