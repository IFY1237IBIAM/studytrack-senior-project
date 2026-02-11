export default function Terms() {
  return (
    <section className="legal-page container">
      {/* Header */}
      <div className="legal-header">
        <p className="legal-kicker">LEGAL</p>
        <h1 className="legal-title">Terms of Service</h1>
        <p className="legal-lead">
          By accessing or using StudyTrack, you agree to the terms outlined
          below.
        </p>
      </div>

      {/* Content */}
      <div className="legal-card">
        <h3>Use of the Platform</h3>
        <p>
          StudyTrack is designed for educational and productivity purposes.
          Users must use the platform responsibly and lawfully.
        </p>

        <h3>User Responsibilities</h3>
        <p>
          You are responsible for maintaining the confidentiality of your
          account credentials and all activities performed under your account.
        </p>

        <h3>Limitations</h3>
        <p>
          StudyTrack is not liable for data loss resulting from user actions,
          misuse, or external factors beyond our control.
        </p>

        <p className="legal-note">Last updated: 2026</p>
      </div>
    </section>
  );
}
