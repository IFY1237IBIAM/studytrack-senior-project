import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoutIcon from "../assets/logout-icon.jpg";
import profileAvatar from "../assets/profile-avatar.png";
import notificationIcon from "../assets/notification-icon.png"; // your downloaded icon


import "../css/style.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [isLoading, setIsLoading] = useState(true);

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", status: "To-Do" });

  // Pagination
  const TASKS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // Notifications
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [bellClicked, setBellClicked] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const [newNotif, setNewNotif] = useState(false);
  // Delete confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);


  // ✅ VIEW STATE
  const [activeView, setActiveView] = useState("dashboard");

  // User profile
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      Promise.all([
        fetchTasks(),
        fetchNotifications(),
        fetchUserProfile(),
      ]).finally(() => setIsLoading(false));
    }
  }, [token, navigate]);

  // ================= FETCH USER PROFILE =================
  const fetchUserProfile = async () => {
    try {
      const res = await fetch("https://studytrack-senior-project-1.onrender.com/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      const res = await fetch("http://localhost:3000/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setUser(data);
    } catch (err) {
      console.error(err);
    }
  };

  // ================= FETCH TASKS =================
  const fetchTasks = async () => {
    try {
      const res = await fetch("https://studytrack-senior-project-1.onrender.com/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setTasks(data);
    } catch (err) {
      console.error(err);
    }
  };

  // ================= FETCH NOTIFICATIONS =================
  const fetchNotifications = async () => {
    try {
      const res = await fetch("https://studytrack-senior-project-1.onrender.com/api/notifications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        const prevLength = notifications.length;
        setNotifications(data);

        if (!bellClicked) {
          setUnreadCount(data.length);
          if (data.length > 0) triggerNewNotifAnimation();
        } else {
          const unseen = data.length - prevLength;
          if (unseen > 0) {
            setUnreadCount((prev) => prev + unseen);
            triggerNewNotifAnimation();
          }
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const triggerNewNotifAnimation = () => {
    setNewNotif(true);
    setTimeout(() => setNewNotif(false), 800);
  };

  // ================= ADD TASK =================
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    try {
      const res = await fetch("https://studytrack-senior-project-1.onrender.com/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newTask),
      });
      const data = await res.json();
      if (res.ok) {
        setTasks([...tasks, data]);
        setNewTask({ title: "", status: "To-Do" });
        await fetchNotifications();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ================= UPDATE TASK =================
  const handleStatusChange = async (id, status) => {
    setTasks(tasks.map((t) => (t._id === id ? { ...t, status } : t)));
    try {
      await fetch(`https://studytrack-senior-project-1.onrender.com/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      await fetchNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= DELETE TASK ================= */
  const openDeleteModal = (id) => {
    setTaskToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDeleteTask = async () => {
    try {
      const res = await fetch(`https://studytrack-senior-project-1.onrender.com/api/tasks/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setTasks(tasks.filter((t) => t._id !== id));
      const res = await fetch(
        `http://localhost:3000/api/tasks/${taskToDelete}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.ok) {
        setTasks(tasks.filter((t) => t._id !== taskToDelete));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setShowDeleteModal(false);
      setTaskToDelete(null);
    }
  };

  // ================= TOGGLE BELL =================
  const toggleBell = () => {
    setBellOpen(!bellOpen);
    if (!bellClicked) {
      setBellClicked(true);
      setUnreadCount(0);
    }
  };
  // ================= DELETE NOTIFICATION =================
  const handleDeleteNotification = async (id) => {
    try {
      const res = await fetch(`https://studytrack-senior-project-1.onrender.com/api/notifications/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const updated = notifications.filter((n) => n._id !== id);
        setNotifications(updated);
        setUnreadCount(updated.length);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ================= SUMMARY =================
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "Completed").length;
  const inProgressTasks = tasks.filter((t) => t.status === "In Progress").length;

  // ================= PAGINATION =================
  const totalPages = Math.ceil(tasks.length / TASKS_PER_PAGE);
  const startIndex = (currentPage - 1) * TASKS_PER_PAGE;
  const endIndex = startIndex + TASKS_PER_PAGE;
  const currentTasks = tasks.slice(startIndex, startIndex + TASKS_PER_PAGE);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [tasks, totalPages, currentPage]);

  // ================= SKELETON LOADER =================
  if (isLoading) {
    return (
      <section className="dashboard">
        <div className="container">
          <div className="dashboard-header">
            <div className="skeleton skeleton-avatar"></div>
            <div className="skeleton skeleton-icon"></div>
          </div>

          <div className="dashboard-summary">
            <div className="summary-card skeleton skeleton-card"></div>
            <div className="summary-card skeleton skeleton-card"></div>
            <div className="summary-card skeleton skeleton-card"></div>
          </div>

          <div className="add-task-form">
            <div className="skeleton skeleton-input"></div>
            <div className="skeleton skeleton-input"></div>
            <div className="skeleton skeleton-button"></div>
          </div>

          <div className="task-list">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="task-card skeleton skeleton-task"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="dashboard">
      <div className="container">
        {/* ================= HEADER ================= */}
        <div className="dashboard-header">
          <div
  className="profile-trigger"
  onClick={() => navigate("/profile", { state: { user } })
}
>
  <img src={profileAvatar} alt="Profile" className="profile-avatar" />
  <span>{user?.name}</span>
</div>


          <div className="dashboard-header-right">
    {/* NOTIFICATION BELL */}
    <div
      className={`notification-bell ${newNotif ? "wiggle" : ""}`}
      onClick={toggleBell}
    >
      <img 
    src={notificationIcon} 
    alt="Notifications" 
    className="notification-icon"
  />
      {unreadCount > 0 && (
        <span className="notification-count">{unreadCount}</span>
      )}

      {bellOpen && (
        <div className="notification-dropdown">
          {notifications.length === 0 ? (
            <p className="no-notifications">No notifications</p>
          ) : (
            notifications.map((notif) => (
              <div key={notif._id} className="notification-item">
                <p>{notif.message}</p>
                <button
                  onClick={() =>
                    handleDeleteNotification(notif._id)
                  }
                >
                  ✖
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>

            <button
              className="settings-btn"
              onClick={() => setActiveView("settings")}
            >
              ⚙️
            </button>
          </div>
        </div>

        {/* ================= VIEW SWITCH ================= */}
        {activeView === "settings" ? (
          /* ================= SETTINGS VIEW ================= */
          <div className="settings-page">
            <div className="settings-header">
              <button
                className="back-btn"
                onClick={() => setActiveView("dashboard")}
              >
                ← Back
              </button>
              <h2>Settings</h2>
            </div>

            <div className="settings-panel">
              <h3>Account</h3>

              <div className="settings-item danger">
                <strong>Delete Account</strong>
                <button className="delete-btn">Delete</button>
              </div>

              <h3>Session</h3>

              <button
                className="logout-setting-btn"
                onClick={() => {
                  localStorage.clear();
                  navigate("/login");
                }}
              >
                <img src={logoutIcon} alt="Logout" />
                Sign out
              </button>
            </div>
          </div>
        ) : (
          /* ================= DASHBOARD VIEW ================= */
          <>
            <div className="dashboard-summary">
              <div className="summary-card">
                <h2>{totalTasks}</h2>
                <p>Total Tasks</p>
              </div>
              <div className="summary-card">
                <h2>{inProgressTasks}</h2>
                <p>In Progress</p>
              </div>
              <div className="summary-card">
                <h2>{completedTasks}</h2>
                <p>Completed</p>
              </div>
            </div>

            <form className="add-task-form" onSubmit={handleAddTask}>
              <input
                type="text"
                placeholder="New task"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
              />
              <select
                value={newTask.status}
                onChange={(e) =>
                  setNewTask({ ...newTask, status: e.target.value })
                }
              >
                <option>To-Do</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
              <button>Add Task</button>
            </form>

            {/* Task list */}
        <div className="task-list">
          {currentTasks.length === 0 ? (
            <p>No tasks found. Add one above!</p>
          ) : (
            currentTasks.map((task) => (
              <div key={task._id} className="task-card">
                <h3>{task.title}</h3>
                <p>Status: {task.status}</p>
                <div className="task-actions">
                  {["To-Do", "In Progress", "Completed"].map((s) => (
                    <button
                      key={s}
                      onClick={() =>
                        handleStatusChange(task._id, s)
                      }
                      disabled={task.status === s}
                    >
                      {s}
                    </button>
                  ))}
                  <button
  type="button"
  onClick={() => openDeleteModal(task._id)}
  style={{ backgroundColor: "#dc3545", marginLeft: "auto" }}
>
  Delete
</button>


                </div>
              </div>
            ))
          )}
        </div>
            {/* ================= PAGINATION ================= */}
            {tasks.length > TASKS_PER_PAGE && (
              <div className="pagination">
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.max(p - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  ← Previous
                </button>

                <span className="page-indicator">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={() =>
                    setCurrentPage((p) =>
                      Math.min(p + 1, totalPages)
                    )
                  }
                  disabled={currentPage === totalPages}
                >
                  Next →
                </button>
              </div>

            )}
          </>
        )}
      </div>
    {/* DELETE MODAL */}
      {showDeleteModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowDeleteModal(false)}
        >
          <div
            className="modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Delete Task</h3>
            <p>Are you sure?</p>

            <div className="modal-actions">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="modal-delete"
                onClick={confirmDeleteTask}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}