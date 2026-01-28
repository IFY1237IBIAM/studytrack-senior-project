import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "Student";
  const token = localStorage.getItem("token");

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", status: "To-Do" });
  const [loading, setLoading] = useState(false);

  // Checks if user is logged in
  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchTasks();
    }
  }, [token, navigate]);

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setTasks(data);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    try {
      const response = await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newTask),
      });
      const data = await response.json();
      if (response.ok) {
        setTasks([...tasks, data]);
        setNewTask({ title: "", status: "To-Do" });
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleStatusChange = async (id, status) => {
    // Optimistic update
    setTasks(tasks.map((task) => (task._id === id ? { ...task, status } : task)));

    try {
      await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        setTasks(tasks.filter(t => t._id !== id));
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  // Summary counts
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "Completed").length;
  const inProgressTasks = tasks.filter((t) => t.status === "In Progress").length;

  return (
    <section className="dashboard">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>Welcome, {userName}!</h1>
          <button
            onClick={() => {
              localStorage.clear();
              navigate('/login');
            }}
            style={{ padding: '8px 16px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Logout
          </button>
        </div>

        {/* ================= DASHBOARD SUMMARY CARDS ================= */}
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

        {/* ================= ADD TASK FORM ================= */}
        <form className="add-task-form" onSubmit={handleAddTask}>
          <input
            type="text"
            placeholder="Enter new task"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
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
          <button type="submit">Add Task</button>
        </form>

        {/* ================= TASK LIST ================= */}
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
                  style={{ backgroundColor: '#dc3545', marginLeft: 'auto' }}
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
