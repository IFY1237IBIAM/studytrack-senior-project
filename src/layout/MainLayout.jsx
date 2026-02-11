import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

/* ================= FAQ SECTION ================= */
function FAQSection() {
  const faqs = [
    {
      question: "What is StudyTrack?",
      answer:
        "StudyTrack is a student productivity platform that helps you manage tasks, track progress, and stay organized throughout your academic journey.",
    },
    {
      question: "Is StudyTrack free to use?",
      answer:
        "Yes. StudyTrack is completely free for students and was built by students to support better learning and time management.",
    },
    {
      question: "Can I access my tasks from different devices?",
      answer:
        "Yes. As long as you log in with your account, your tasks are accessible from any device.",
    },
    {
      question: "Is my data safe?",
      answer:
        "Yes. Your data is securely handled through our backend API and authentication system. Only you can access your tasks.",
    },
    {
      question: "Can this be used for group or team tasks?",
      answer:
        "Currently, tasks are personal. However, team-based and instructor-assigned tasks are planned for future updates.",
    },
  ];

  return (
    <section className="faq-section">
      <div className="container">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <p className="section-subtitle">
          Everything you need to know about StudyTrack
        </p>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <details key={index} className="faq-item">
              <summary className="faq-question">{faq.question}</summary>
              <p className="faq-answer">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= MAIN LAYOUT ================= */
export default function MainLayout() {
  const location = useLocation();

  return (
    <>
      <Header />
      

      {/* Page Content */}
      <Outlet />

      {/* Show FAQ ONLY on homepage */}
      {location.pathname === "/" && <FAQSection />}

      <Footer />
    </>
  );
}
