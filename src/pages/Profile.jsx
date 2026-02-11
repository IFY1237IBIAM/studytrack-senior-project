import { useLocation, useNavigate } from "react-router-dom";
import ProfileIcon from "../assets/profile-avatar.png"; // 
import { useState, useEffect } from "react";

export default function Profile() {
  const navigate = useNavigate();
  const location = useLocation();
  const userFromState = location.state?.user;

  const [user, setUser] = useState(userFromState || null);
  const [loading, setLoading] = useState(!userFromState);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else if (!userFromState) {
      fetchUserProfile();
    }
  }, [token, navigate, userFromState]);

  const fetchUserProfile = async () => {
    try {
      const res = await fetch("https://studytrack-senior-project-1.onrender.com/api/users/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setUser(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };



  if (loading) return <p>Loading profile...</p>;

  return (
    <section className="profile-page">
      <div className="container">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Back
        </button>

        {user ? (
          <div className="profile-card">
            <img src={ProfileIcon} alt="Profile" className="profile-image" />
            <h2>{localStorage.getItem("userName")}</h2>
            <p>{user.email}</p>
            <p>Role: {localStorage.getItem("role") || "Student"}</p>
          </div>
        ) : (
          <p>User profile not found.</p>
        )}
      </div>
    </section>
  );
}
