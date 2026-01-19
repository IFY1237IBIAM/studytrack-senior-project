import { useState } from "react";

export default function Dashboard() {
  const userName = localStorage.getItem("userName") || "Student";

  const [tasks, setTasks] = useState([
    { id: 1, title: "Finish math assignment", status: "To-Do" },
    { id: 2, title: "Submit group report", status: "In Progress" },
    { id: 3, title: "Prepare presentation", status: "Completed" },
  ]);

  const [newTask, setNewTask] = useState({ title: "", status: "To-Do" });

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    setTasks([
      ...tasks,
      { id: Date.now(), title: newTask.title, status: newTask.status },
    ]);

    setNewTask({ title: "", status: "To-Do" });
  };

  const handleStatusChange = (id, status) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, status } : task))
    );
  };

  // Summary counts
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "Completed").length;
  const inProgressTasks = tasks.filter((t) => t.status === "In Progress").length;

  return (
    <section className="dashboard">
      <div className="container">
        <h1>Welcome, {userName}!</h1>

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
          {tasks.map((task) => (
            <div key={task.id} className="task-card">
              <h3>{task.title}</h3>
              <p>Status: {task.status}</p>
              <div className="task-actions">
                {["To-Do", "In Progress", "Completed"].map((s) => (
                  <button
                    key={s}
                    onClick={() => handleStatusChange(task.id, s)}
                    disabled={task.status === s}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
