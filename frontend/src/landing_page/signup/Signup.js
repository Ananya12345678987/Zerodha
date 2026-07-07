import React, { useState } from "react";

// const DASHBOARD_URL = "http://localhost:3001";
// const BACKEND_URL = "http://localhost:3002";

const DASHBOARD_URL = process.env.REACT_APP_DASHBOARD_URL || "http://localhost:3001";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3002";


const Signup = () => {
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const switchMode = (newMode) => {
    setMode(newMode);
    setError("");
    setForm({ name: "", email: "", password: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const endpoint = mode === "signup" ? "/signup" : "/login";
    const payload =
      mode === "signup"
        ? form
        : { email: form.email, password: form.password };

    try {
      const res = await fetch(`${BACKEND_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error("Backend returned an invalid response");
      }

      if (!res.ok) {
        setError(data.message || `${mode === "signup" ? "Signup" : "Login"} failed`);
        setLoading(false);
        return;
      }

      window.location.href = `${DASHBOARD_URL}/?token=${data.token}`;
    } catch (err) {
      console.error(err);
      setError(
        err.message === "Failed to fetch"
          ? "Can't reach the server. Is the backend running on port 3002?"
          : "Something went wrong. Try again."
      );
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "80px auto" }}>
      <h2>{mode === "signup" ? "Sign up" : "Login"}</h2>

      <form onSubmit={handleSubmit}>
        {mode === "signup" && (
          <div style={{ marginBottom: 12 }}>
            <input
              type="text"
              name="name"
              placeholder="Full name"
              value={form.name}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: 8 }}
            />
          </div>
        )}

        <div style={{ marginBottom: 12 }}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" disabled={loading} style={{ width: "100%", padding: 10 }}>
          {loading ? "Please wait..." : mode === "signup" ? "Sign up" : "Login"}
        </button>
      </form>

      <p style={{ marginTop: 16, textAlign: "center" }}>
        {mode === "signup" ? (
          <>
            Already have an account?{" "}
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => switchMode("login")}
            >
              Login
            </span>
          </>
        ) : (
          <>
            New here?{" "}
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => switchMode("signup")}
            >
              Create an account
            </span>
          </>
        )}
      </p>
    </div>
  );
};

export default Signup;