// src/pages/About.jsx
import aboutImg1 from "../assets/about-team-1.jpg";
import aboutImg2 from "../assets/about-team-2.jpg";

export default function About() {
  return (
    <main className="about-page">
      {/* Top / Hero */}
      <section className="about-hero">
        <div className="container about-hero__grid">
          <div className="about-hero__content">
            <p className="about-kicker">ABOUT STUDYTRACK</p>

            <h1 className="about-heading">
              Simple task tracking for student teams
            </h1>

            <p className="about-lead">
              StudyTrack helps students organize tasks, deadlines, and progress
              without the clutter of complex tools. It’s built for small teams
              who want clarity, accountability, and momentum.
            </p>

            <div className="about-pills">
              <span className="pill">React</span>
              <span className="pill">Node + Express</span>
              <span className="pill">MongoDB</span>
              <span className="pill">Agile Sprints</span>
            </div>
          </div>

          <div className="about-hero__media">
            <img
              className="about-image about-hero__image"
              src={aboutImg1}
              alt="Students collaborating together"
            />
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="about-mission">
        <div className="container about-mission__grid">
          <div className="about-mission__media">
            <img
              className="about-image about-mission__image"
              src={aboutImg2}
              alt="Team discussion at a table"
            />
          </div>

          <div className="about-mission__content">
            <h2 className="about-subheading">Our Mission</h2>

            <p className="about-text">
              Our mission is to help students stay on track by making teamwork
              visible and progress easy to measure. StudyTrack keeps everyone
              aligned with clear task ownership, simple statuses, and a dashboard
              that shows what’s moving forward.
            </p>

            <ul className="about-points">
              <li>
                <strong>Clarity:</strong> Know what needs to be done and who owns it.
              </li>
              <li>
                <strong>Momentum:</strong> Move tasks from To-Do to Done without friction.
              </li>
              <li>
                <strong>Accountability:</strong> Track progress as a team, week by week.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Bottom Callout */}
      <section className="about-callout">
        <div className="container">
          <div className="about-callout__box">
            <h3 className="about-callout__title">Built by students, for students</h3>
            <p className="about-callout__text">
              Created as a senior project using an agile workflow with weekly
              standups and sprint planning.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
