import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleLogin(event) {
    event.preventDefault();
    if (username === "admin" && password === "kostibutri") {
      sessionStorage.setItem("kosIbuTriAdmin", "true");
      navigate("/admin", { replace: true });
    } else {
      setError("Username atau password belum sesuai.");
    }
  }

  return (
    <main className="admin-login-page">
      <form className="admin-login-card" onSubmit={handleLogin}>
        <span className="admin-login-mark">KT</span>
        <span className="admin-eyebrow">KOS IBU TRI</span>
        <h1>Admin Login</h1>
        <p>Masuk untuk mengelola informasi kost.</p>
        <label htmlFor="admin-username">Username</label>
        <input id="admin-username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Masukkan username" required />
        <label htmlFor="admin-password">Password</label>
        <input id="admin-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Masukkan password" required />
        {error && <p className="admin-form-error" role="alert">{error}</p>}
        <button className="admin-primary-btn" type="submit">Masuk Dashboard</button>
        <small className="admin-demo-note">Demo login: <b>admin</b> / <b>kostibutri</b></small>
        <Link to="/" className="admin-login-back">← Kembali ke website</Link>
      </form>
    </main>
  );
}
