import { useState, useRef, useEffect } from "react";
import {
  Bell,
  X,
  Check,
  Users,
  Dumbbell,
  DollarSign,
  AlertCircle,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const NOTIFICATIONS = [
  {
    id: 1,
    type: "member",
    icon: Users,
    color: "bg-blue-50 text-blue-500 dark:bg-blue-900/20",
    title: "New member joined",
    message: "Sara Williams signed up for Premium plan.",
    time: "2 min ago",
    read: false,
  },
  {
    id: 2,
    type: "class",
    icon: Dumbbell,
    color: "bg-green-50 text-green-500 dark:bg-green-900/20",
    title: "Class is full",
    message: "HIIT Blast at 09:00 AM has reached full capacity.",
    time: "15 min ago",
    read: false,
  },
  {
    id: 3,
    type: "revenue",
    icon: DollarSign,
    color: "bg-purple-50 text-purple-500 dark:bg-purple-900/20",
    title: "Payment received",
    message: "Monthly revenue target of $24k has been reached.",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 4,
    type: "alert",
    icon: AlertCircle,
    color: "bg-yellow-50 text-yellow-500 dark:bg-yellow-900/20",
    title: "Member inactive",
    message: "Tom Chen has been inactive for 30 days.",
    time: "3 hours ago",
    read: true,
  },
  {
    id: 5,
    type: "member",
    icon: Users,
    color: "bg-blue-50 text-blue-500 dark:bg-blue-900/20",
    title: "Membership expiring",
    message: "Omar Shaikh's Annual plan expires in 3 days.",
    time: "5 hours ago",
    read: true,
  },
];

export default function NotificationDropdown() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const ref = useRef(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // close on outside click
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const dismiss = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const markRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  return (
    <div className="relative" ref={ref}>
      {/* Bell Button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      >
        <Bell size={17} className="text-slate-500 dark:text-slate-400" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-green-500 rounded-full ring-2 ring-white dark:ring-slate-900 flex items-center justify-center text-[9px] text-white font-bold">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 z-50 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <h3 className="font-display font-semibold text-sm text-slate-800 dark:text-white">
                Notifications
              </h3>
              {unreadCount > 0 && (
                <span className="text-xs bg-green-500 text-white font-bold px-1.5 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400 hover:underline font-medium"
              >
                <Check size={12} />
                Mark all read
              </button>
            )}
          </div>

          {/* List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-slate-50 dark:divide-slate-800">
            {notifications.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-slate-400">
                No notifications
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => markRead(n.id)}
                  className={`flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${
                    !n.read ? "bg-green-50/30 dark:bg-green-900/10" : ""
                  }`}
                >
                  {/* Icon */}
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${n.color}`}
                  >
                    <n.icon size={14} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p
                        className={`text-sm font-medium truncate ${
                          !n.read
                            ? "text-slate-900 dark:text-white"
                            : "text-slate-600 dark:text-slate-400"
                        }`}
                      >
                        {n.title}
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          dismiss(n.id);
                        }}
                        className="text-slate-300 hover:text-slate-500 dark:text-slate-600 dark:hover:text-slate-400 flex-shrink-0"
                      >
                        <X size={13} />
                      </button>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                      {n.message}
                    </p>
                    <p className="text-[10px] text-slate-300 dark:text-slate-600 mt-1">
                      {n.time}
                    </p>
                  </div>

                  {/* Unread dot */}
                  {!n.read && (
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0 mt-2" />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
