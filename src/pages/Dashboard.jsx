import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoutIcon from "../assets/logout-icon.jpg";

import "../css/style.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "Student";
  const token = localStorage.getItem("token");

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", status: "To-Do" });

  // Notifications
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [bellClicked, setBellClicked] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const [newNotif, setNewNotif] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchTasks();
      fetchNotifications();
    }
  }, [token, navigate]);

  // ================= FETCH TASKS =================
  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/tasks", {
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
      const res = await fetch("http://localhost:3000/api/notifications", {
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
      const res = await fetch("http://localhost:3000/api/tasks", {
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

        await fetchNotifications(); // update notifications immediately
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ================= UPDATE TASK STATUS =================
  const handleStatusChange = async (id, status) => {
    setTasks(tasks.map((t) => (t._id === id ? { ...t, status } : t)));
    try {
      await fetch(`http://localhost:3000/api/tasks/${id}`, {
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

  // ================= DELETE TASK =================
  const handleDeleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      const res = await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // ================= TOGGLE BELL =================
  const toggleBell = () => {
    setBellOpen(!bellOpen);
    if (!bellClicked) {
      setBellClicked(true);
      setUnreadCount(0); // reset badge on first click
    }
  };

  // ================= DELETE NOTIFICATION =================
  const handleDeleteNotification = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/notifications/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const updated = notifications.filter((n) => n._id !== id);
        setNotifications(updated);
        setUnreadCount(updated.length); // update count
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ================= SUMMARY =================
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "Completed").length;
  const inProgressTasks = tasks.filter((t) => t.status === "In Progress").length;

  return (
    <section className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>Welcome, {userName}!</h1>

          <div className="dashboard-header-right">
            {/* Notification Bell */}
            <div
              className={`notification-bell ${newNotif ? "wiggle" : ""}`}
              onClick={toggleBell}
            >
              🔔
              {unreadCount > 0 && <span className="notification-count">{unreadCount}</span>}

              {bellOpen && (
                <div className="notification-dropdown">
                  {notifications.length === 0 ? (
                    <p className="no-notifications">No notifications</p>
                  ) : (
                    notifications.map((notif) => (
                      <div key={notif._id} className="notification-item">
                        <p>{notif.message}</p>
                        <button onClick={() => handleDeleteNotification(notif._id)}>✖</button>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Logout icon */}
            {/* Logout icon (using local asset) */}
<button
  onClick={() => {
    localStorage.clear();
    navigate("/login");
  }}
  className="logout-btn"
>
  <img 
    src={logoutIcon} 
    alt="Logout" 
    style={{ width: "24px", height: "24px" }} 
  />
</button>

          </div>
        </div>

        {/* Dashboard summary */}
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

        {/* Add Task */}
        <form className="add-task-form" onSubmit={handleAddTask}>
          <input
            type="text"
            placeholder="Enter new task"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <select
            value={newTask.status}
            onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
          >
            <option>To-Do</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
          <button type="submit">Add Task</button>
        </form>

        {/* Task list */}
        <div className="task-list">
          {tasks.length === 0 ? <p>No tasks found. Add one above!</p> : tasks.map((task) => (
            <div key={task._id} className="task-card">
              <h3>{task.title}</h3>
              <p>Status: {task.status}</p>
              <div className="task-actions">
                {["To-Do", "In Progress", "Completed"].map((s) => (
                  <button
                    key={s}
                    onClick={() => handleStatusChange(task._id, s)}
                    disabled={task.status === s}
                  >
                    {s}
                  </button>
                ))}
                <button
                  onClick={() => handleDeleteTask(task._id)}
                  style={{ backgroundColor: "#dc3545", marginLeft: "auto" }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
