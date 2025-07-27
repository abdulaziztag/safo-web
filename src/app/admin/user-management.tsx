"use client";
import React, { useEffect, useState } from "react";

interface User {
  _id: string;
  username: string;
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch all users
  const fetchUsers = async () => {
    setLoading(true);
    const res = await fetch("/api/setup", { method: "GET" });
    const data = await res.json();
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Create user
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const res = await fetch("/api/setup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    setMessage(data.message || data.error);
    setUsername("");
    setPassword("");
    fetchUsers();
    setLoading(false);
  };

  // Delete user
  const handleDeleteUser = async (username: string) => {
    setLoading(true);
    setMessage("");
    const res = await fetch("/api/setup", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });
    const data = await res.json();
    setMessage(data.message || data.error);
    fetchUsers();
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", padding: 24, border: "1px solid #eee", borderRadius: 8 }}>
      <h2>User Management</h2>
      <form onSubmit={handleCreateUser} style={{ marginBottom: 24 }}>
        <div style={{ marginBottom: 8 }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            style={{ width: "100%", padding: 8, marginBottom: 8 }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: 8 }}
          />
        </div>
        <button type="submit" disabled={loading} style={{ width: "100%", padding: 10 }}>
          {loading ? "Processing..." : "Create User"}
        </button>
      </form>
      {message && <div style={{ marginBottom: 16, color: message.includes("error") ? "red" : "green" }}>{message}</div>}
      <h3>All Users</h3>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {users.map(user => (
            <li key={user._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #eee" }}>
              <span>{user.username}</span>
              <button onClick={() => handleDeleteUser(user.username)} style={{ color: "white", background: "#e74c3c", border: "none", padding: "6px 12px", borderRadius: 4, cursor: "pointer" }}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 