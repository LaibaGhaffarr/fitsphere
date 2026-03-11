import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
import Classes from "./pages/Classes";
import Customers from "./pages/Customers";
import Reports from "./pages/Reports";
import Login from "./pages/Login";

function AppLayout({ darkMode, toggleDarkMode }) {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const isLoginPage = pathname === "/login";

  // already logged in → skip login page
  if (isLoginPage && user) {
    return <Navigate to="/" replace />;
  }

  // full screen login
  if (isLoginPage) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <Topbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main className="flex-1 pt-16 p-8">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/classes"
              element={
                <ProtectedRoute>
                  <Classes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customers"
              element={
                <ProtectedRoute>
                  <Customers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reports"
              element={
                <ProtectedRoute>
                  <Reports />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("fitsphere-theme") === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("fitsphere-theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("fitsphere-theme", "light");
    }
  }, [darkMode]);

  return (
    <BrowserRouter>
      <AppLayout
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode((d) => !d)}
      />
    </BrowserRouter>
  );
}
