// src/components/Hero.jsx
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/hero-banner.png";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <>
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-text">
            <h1>Learn Anything, Anytime</h1>
            <p>
              Track your study progress, manage tasks, collaborate with peers,
              and stay organized — all in one place.
            </p>

            <button className="btn-primary" onClick={() => navigate("/login")}>
              Get Started
            </button>

            <div className="hero-stats">
              <div className="stat">
                <h3>50+</h3>
                <span>Active Students</span>
              </div>
              <div className="stat">
                <h3>120+</h3>
                <span>Study Sessions</span>
              </div>
              <div className="stat">
                <h3>95%</h3>
                <span>Productivity Boost</span>
              </div>
            </div>

            <div className="hero-testimonial">
              <p>
                “StudyTrack helped me stay consistent and plan my semester
                without stress. I finally feel in control of my studies.”
              </p>
              <span>— Final Year Student</span>
            </div>
          </div>

          <div className="hero-image">
            <img src={heroImage} alt="Study illustration" />
          </div>
        </div>
      </section>

      <section className="team">
        <div className="container">
          <h2 className="section-title">Meet Our Team</h2>
          <p className="section-subtitle">
            Students building solutions for students
          </p>

          <div className="team-grid">
            <div className="team-card">
              <div className="team-avatar">II</div>
              <h3>Ifeanyi Ifegwu</h3>
              <span>Frontend & Project Lead</span>
              <p>
                “Designing tools that help students stay focused and succeed.”
              </p>
            </div>

            <div className="team-card">
              <div className="team-avatar">MA</div>
              <h3>Maria Arevalo</h3>
              <span>Planning & Documentation</span>
              <p>“Clear documentation creates smooth collaboration.”</p>
            </div>

            <div className="team-card">
              <div className="team-avatar">LA</div>
              <h3>Leo Alfred</h3>
              <span>Backend & API Design</span>
              <p>“Strong logic is the backbone of every great application.”</p>
            </div>

            <div className="team-card">
              <div className="team-avatar">MN</div>
              <h3>Malcom Nigel</h3>
              <span>Testing & Quality Assurance</span>
              <p>“Reliability turns good ideas into trusted products.”</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
