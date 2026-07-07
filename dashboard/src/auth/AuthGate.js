import React, { useEffect, useState } from "react";

const FRONTEND_LOGIN_URL = process.env.REACT_APP_FRONTEND_URL
  ? `${process.env.REACT_APP_FRONTEND_URL}/login`
  : "http://localhost:3000/login";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3002";

const AuthGate = ({ children }) => {
  const [status, setStatus] = useState("checking"); // checking | ok | fail

  useEffect(() => {
    const verify = async () => {
      const params = new URLSearchParams(window.location.search);
      const urlToken = params.get("token");

      if (urlToken) {
        localStorage.setItem("token", urlToken);
        window.history.replaceState({}, document.title, window.location.pathname);
      }

      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = FRONTEND_LOGIN_URL;
        return;
      }

      try {
        const res = await fetch(`${BACKEND_URL}/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("invalid token");
        setStatus("ok");
      } catch {
        localStorage.removeItem("token");
        window.location.href = FRONTEND_LOGIN_URL;
      }
    };

    verify();
  }, []);

  if (status === "checking") return <div style={{ padding: 40 }}>Loading...</div>;
  if (status === "ok") return children;
  return null;
};

export default AuthGate;