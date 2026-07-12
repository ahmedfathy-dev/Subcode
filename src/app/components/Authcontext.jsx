"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
const STORAGE_KEY = "auth_user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);

  // restore session on first load
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setUser(JSON.parse(saved));
    } catch {
      // ignore corrupted storage
    } finally {
      setCheckingSession(false);
    }
  }, []);

  // ------------------------------------------------------------------
  // TODO: replace this simulated call with your real auth endpoint, e.g.:
  //
  // const res = await fetch("/api/auth/login", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ email, password }),
  // });
  // if (!res.ok) throw new Error("invalid_credentials");
  // const data = await res.json();
  // ------------------------------------------------------------------
  function fakeLogin(email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (password.length >= 6) {
          resolve({ email });
        } else {
          reject(new Error("invalid_credentials"));
        }
      }, 900);
    });
  }

  async function login(email, password, remember = true) {
    const result = await fakeLogin(email, password);
    setUser(result);
    if (remember) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
    }
    return result;
  }

  function logout() {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <AuthContext.Provider value={{ user, checkingSession, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside an <AuthProvider>");
  }
  return ctx;
}