export default function Privacy() {
  return (
    <section className="legal-page container">
      {/* Header */}
      <div className="legal-header">
        <p className="legal-kicker">LEGAL</p>
        <h1 className="legal-title">Privacy Policy</h1>
        <p className="legal-lead">
          Your privacy matters to us. This policy explains how StudyTrack
          collects, uses, and protects your information.
        </p>
      </div>

      {/* Content */}
      <div className="legal-card">
        <h3>Information We Collect</h3>
        <p>
          We collect basic account information such as your name, email address,
          and task-related data to provide core features and functionality.
        </p>

        <h3>How We Use Your Data</h3>
        <p>
          Your data is used solely to improve your experience on StudyTrack.
          We do not sell, rent, or share your personal information with
          third parties.
        </p>

        <h3>Data Security</h3>
        <p>
          We implement secure authentication and backend protection measures
          to safeguard your information against unauthorized access.
        </p>

        <p className="legal-note">Last updated: 2026</p>
      </div>
    </section>
  );
}
