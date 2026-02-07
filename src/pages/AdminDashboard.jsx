// src/pages/AdminDashboard.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const MOCK_USERS = [
  {
    id: "u1",
    name: "Alex Johnson",
    email: "alex@example.com",
    role: "user",
    status: "active",
    lastActive: "2026-02-01",
    flags: [],
  },
  {
    id: "u2",
    name: "Maria Gomez",
    email: "maria@example.com",
    role: "user",
    status: "active",
    lastActive: "2025-12-10",
    flags: ["inactive"],
  },
  {
    id: "u3",
    name: "Chris Lee",
    email: "chris@example.com",
    role: "user",
    status: "active",
    lastActive: "2026-01-28",
    flags: ["abuse"],
  },
  {
    id: "u4",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    status: "active",
    lastActive: "2026-02-07",
    flags: [],
  },
];

export default function AdminDashboard() {
  const navigate = useNavigate();

  // Frontend-only guard (Leo will wire real role later)
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // expected: "admin"

  const [users, setUsers] = useState(MOCK_USERS);
  const [query, setQuery] = useState("");
  const [flagFilter, setFlagFilter] = useState("all");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    // If role exists and isn't admin, send them away
    if (role && role !== "admin") {
      navigate("/dashboard");
    }
  }, [token, role, navigate]);

  const filteredUsers = useMemo(() => {
    const q = query.trim().toLowerCase();

    return users.filter((u) => {
      const matchesQuery =
        !q ||
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q);

      const matchesFlag =
        flagFilter === "all" ? true : (u.flags || []).includes(flagFilter);

      return matchesQuery && matchesFlag;
    });
  }, [users, query, flagFilter]);

  // UI-only actions (backend will be connected by Leo)
  const handleDisable = (id) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: "disabled" } : u))
    );
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this user? (UI only)")) return;
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <section className="admin-dashboard">
      <div className="container">
        <div className="admin-top">
          <div>
            <p className="admin-kicker">ADMIN</p>
            <h1 className="admin-title">Admin Dashboard</h1>
            <p className="admin-subtitle">
              View users, review flags, and take action (UI only — backend wiring next).
            </p>
          </div>

          <div className="admin-filters">
            <input
              className="admin-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or email…"
            />

            <select
              className="admin-select"
              value={flagFilter}
              onChange={(e) => setFlagFilter(e.target.value)}
            >
              <option value="all">All users</option>
              <option value="inactive">Flagged: Inactive</option>
              <option value="abuse">Flagged: Abuse</option>
              <option value="policy">Flagged: Policy</option>
            </select>
          </div>
        </div>

        <div className="admin-card">
          <div className="admin-card-head">
            <h2 className="admin-card-title">Users</h2>
            <span className="admin-count">{filteredUsers.length} shown</span>
          </div>

          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Last Active</th>
                  <th>Flags</th>
                  <th className="admin-actions-col">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((u) => (
                  <tr key={u.id}>
                    <td>
                      <div className="admin-usercell">
                        <div className="admin-avatar">
                          {u.name?.[0]?.toUpperCase() || "U"}
                        </div>
                        <div>
                          <div className="admin-name">{u.name}</div>
                          <div className="admin-email">{u.email}</div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className={`tag ${u.role === "admin" ? "tag--purple" : ""}`}>
                        {u.role}
                      </span>
                    </td>

                    <td>
                      <span className={`tag ${u.status === "disabled" ? "tag--gray" : "tag--green"}`}>
                        {u.status}
                      </span>
                    </td>

                    <td>{u.lastActive}</td>

                    <td>
                      {(u.flags || []).length ? (
                        <div className="flag-row">
                          {u.flags.map((f) => (
                            <span key={f} className="flag-pill">{f}</span>
                          ))}
                        </div>
                      ) : (
                        <span className="muted">—</span>
                      )}
                    </td>

                    <td className="admin-actions-col">
                      <div className="admin-actions">
                        <button
                          className="btn btn--outline"
                          onClick={() => handleDisable(u.id)}
                          disabled={u.status === "disabled"}
                        >
                          Disable
                        </button>

                        <button
                          className="btn btn--danger"
                          onClick={() => handleDelete(u.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {!filteredUsers.length && (
                  <tr>
                    <td colSpan="6" className="admin-empty">
                      No users match your search/filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <p className="admin-note">
            Backend contract for Leo:
            <br />
            Route: <code>/admin/dashboard</code>
            <br />
            Expected user fields: <code>id</code>, <code>name</code>, <code>email</code>, <code>role</code>, <code>status</code>, <code>lastActive</code>, <code>flags[]</code>
            <br />
            Actions triggered: <code>disableUser(id)</code>, <code>deleteUser(id)</code>
          </p>
        </div>
      </div>
    </section>
  );
}
