import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  LayoutDashboard,
  Dumbbell,
  Users,
  BarChart3,
  Zap,
  LogOut,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export default function Sidebar() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const NAV_ITEMS = [
    { to: "/", label: t("dashboard"), icon: LayoutDashboard },
    { to: "/classes", label: t("classes"), icon: Dumbbell },
    { to: "/customers", label: t("customers"), icon: Users },
    { to: "/reports", label: t("reports"), icon: BarChart3 },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside
      className="
      fixed top-0 left-0 h-screen w-64
      bg-white dark:bg-slate-900
      border-r border-slate-100 dark:border-slate-800
      flex flex-col z-30
    "
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-6 py-5 border-b border-slate-100 dark:border-slate-800">
        <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center">
          <Zap size={16} className="text-white" fill="white" />
        </div>
        <span className="font-display font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
          Fit<span className="text-green-500">Sphere</span>
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
        <p className="px-4 mb-3 text-[10px] font-display font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-600">
          {t("mainMenu")}
        </p>
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <Icon size={18} strokeWidth={1.8} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            AU
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-800 dark:text-slate-100 truncate">
              {user?.name || "Admin User"}
            </p>
            <p className="text-xs text-slate-400 truncate">
              {user?.email || "admin@fitsphere.io"}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="text-slate-400 hover:text-red-500 transition-colors"
            title="Logout"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}
