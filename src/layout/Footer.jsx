// src/layout/Footer.jsx
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import facebook from "../assets/facebook.svg";
import instagram from "../assets/instagram.svg";
import twitter from "../assets/twitter.svg";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">

        {/* LOGO + RIGHTS */}
        <div className="footer-top">
          <img src={logo} alt="StudyTrack Logo" className="footer-logo" />
          <p>© 2026 StudyTrack. All rights reserved.</p>

          {/* SOCIAL LINKS */}
          <ul className="social-list">
            <li>
              <a href="#" className="social-link">
                <img src={facebook} alt="facebook" />
              </a>
            </li>

            <li>
              <a href="#" className="social-link">
                <img src={instagram} alt="instagram" />
              </a>
            </li>

            <li>
              <a href="#" className="social-link">
                <img src={twitter} alt="twitter" />
              </a>
            </li>
          </ul>
        </div>

        {/* FOOTER DETAILS */}
        <div className="footer-grid">
          <ul className="footer-list">
            <li>
              <p className="h3">Opening Hours</p>
            </li>
            <li>
              <p>Monday – Friday</p>
              <span>9.00 – 18.00</span>
            </li>
            <li>
              <p>Saturday</p>
              <span>10.00 – 17.00</span>
            </li>
            <li>
              <p>Sunday</p>
              <span>Closed</span>
            </li>
          </ul>

          <ul className="footer-list">
            <li>
              <p className="h3">Contact Info</p>
            </li>
            <li>
              <a href="tel:+4401132432559" className="footer-link">
                📞 +3473 920 223 444
              </a>
            </li>
            <li>
              <a href="mailto:info@studytrack.com" className="footer-link">
                ✉️ info@studytrack.com
              </a>
            </li>
            <li>
              <address className="footer-link">
                📍 project 6
              </address>
            </li>
          </ul>
        </div>

        {/* LEGAL LINKS (NEW – MODERN STYLE) */}
        <div className="footer-legal">
          <Link to="/privacy">Privacy Policy</Link>
          <span>•</span>
          <Link to="/terms">Terms of Service</Link>
        </div>

      </div>
    </footer>
  );
}
