import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileIcon from "../assets/profile-avatar.png";
import logoutIcon from "../assets/logout-icon.jpg";
import "../css/style.css";

export default function Profile() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchUserProfile();
    }
  }, [token, navigate]);

  const fetchUserProfile = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        setUser(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p style={{ padding: "20px" }}>Loading profile...</p>;

  return (
    <section className="profile-page">
      <div className="container">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Back
        </button>

        <div className="profile-card">
          <img
            src={ProfileIcon} 
            alt="Profile" 
            style={{ width: "42px", height: "42px" }} 
            className="profile-image"
          />

          <h2>{user?.name}</h2>
          <p>{user?.email}</p>
          <p>Role: {user?.role || "Student"}</p>
        </div>
      </div>
    </section>
  );
}
