import team1 from "../assets/about-team-1.jpg";
import team2 from "../assets/about-team-2.jpg";

export default function About() {
  return (
    <div className="about">
      {/* HERO */}
      <section className="about-hero">
        <div className="container about-hero__grid">
          <div className="about-hero__content">
            <p className="about-eyebrow">About StudyTrack</p>
            <h1 className="about-title">Simple task tracking for student teams</h1>
            <p className="about-subtitle">
              StudyTrack helps students organize tasks, deadlines, and progress without the clutter of
              complex tools. It’s built for small teams who want clarity, accountability, and momentum.
            </p>

            <div className="about-badges">
              <span className="about-badge">React</span>
              <span className="about-badge">Node + Express</span>
              <span className="about-badge">MongoDB</span>
              <span className="about-badge">Agile Sprints</span>
            </div>
          </div>

          <div className="about-hero__imageWrap">
            <img className="about-hero__image" src={team1} alt="Students collaborating on laptops" />
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="about-mission">
        <div className="container about-mission__grid">
          <div className="about-mission__imageWrap">
            <img className="about-mission__image" src={team2} alt="A group of students smiling together" />
          </div>

          <div className="about-mission__content">
            <h2 className="about-sectionTitle">Our Mission</h2>
            <p className="about-sectionText">
              Our mission is to help students stay on track by making teamwork visible and progress easy
              to measure. StudyTrack keeps everyone aligned with clear task ownership, simple statuses,
              and a dashboard that shows what’s moving forward.
            </p>

            <ul className="about-list">
              <li><strong>Clarity:</strong> Know what needs to be done and who owns it.</li>
              <li><strong>Momentum:</strong> Move tasks from To-Do to Done without friction.</li>
              <li><strong>Accountability:</strong> Track progress as a team, week by week.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* OPTIONAL: SMALL TEAM STRIP */}
      <section className="about-teamStrip">
        <div className="container about-teamStrip__box">
          <h3 className="about-teamStrip__title">Built by students, for students</h3>
          <p className="about-teamStrip__text">
            Created as a senior project using an agile workflow with weekly standups and sprint planning.
          </p>
        </div>
      </section>
    </div>
  );
}
