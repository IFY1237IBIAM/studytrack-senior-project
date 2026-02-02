import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    company: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // UI-only for now (Sprint scope). Backend integration later.
    alert("Message sent! (UI demo — backend integration next sprint)");
    setForm({ fullName: "", email: "", company: "", message: "" });
  };

  return (
    <div className="contact">
      <section className="contact-hero">
        <div className="container contact-grid">
          {/* LEFT COLUMN */}
          <div className="contact-left">
            <p className="contact-eyebrow">CONTACT US</p>
            <h1 className="contact-title">Get in touch today</h1>
            <p className="contact-subtitle">
              Questions, feedback, or a feature idea? Send us a message and we’ll
              respond as soon as we can.
            </p>

            <div className="contact-cards">
              <div className="contact-card">
                <div className="contact-icon" aria-hidden="true">✉️</div>
                <div>
                  <p className="contact-cardLabel">Email</p>
                  <p className="contact-cardValue">studytrack@team.com</p>
                </div>
              </div>

              <div className="contact-card">
                <div className="contact-icon" aria-hidden="true">📞</div>
                <div>
                  <p className="contact-cardLabel">Phone</p>
                  <p className="contact-cardValue">(123) 123-3213</p>
                </div>
              </div>
            </div>

            <div className="contact-social">
              <p className="contact-socialLabel">Reach out to us on:</p>
              <div className="contact-socialIcons">
                <a className="social-btn" href="#" aria-label="Facebook">f</a>
                <a className="social-btn" href="#" aria-label="X">X</a>
                <a className="social-btn" href="#" aria-label="Instagram">◎</a>
                <a className="social-btn" href="#" aria-label="LinkedIn">in</a>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="contact-right">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="fullName">Full Name</label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Your name"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Your email address"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="company">Company (optional)</label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  placeholder="Company name"
                  value={form.company}
                  onChange={handleChange}
                />
              </div>

              <div className="field">
                <label htmlFor="message">Leave us a message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Write your message here..."
                  rows="6"
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button className="contact-submit" type="submit">
                Send Message
              </button>

              <p className="contact-note">
                UI demo — backend submission will be added in a later sprint.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
