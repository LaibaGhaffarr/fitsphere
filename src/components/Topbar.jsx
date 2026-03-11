import { useState, useRef, useEffect } from "react";
import { Sun, Moon, Globe, Search, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import NotificationDropdown from "./NotificationDropdown";
import { classesData, customersData } from "../utils/data";

const LANGUAGES = [
  { code: "en", label: "EN", name: "English" },
  { code: "ar", label: "AR", name: "العربية" },
  { code: "ur", label: "UR", name: "اردو" },
  { code: "tr", label: "TR", name: "Türkçe" },
  { code: "de", label: "DE", name: "Deutsch" },
];

const PAGES = [
  { label: "Dashboard", to: "/" },
  { label: "Classes", to: "/classes" },
  { label: "Customers", to: "/customers" },
  { label: "Reports", to: "/reports" },
  { label: "Login", to: "/login" },
];

export default function Topbar({ darkMode, toggleDarkMode }) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [langOpen, setLangOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const searchRef = useRef(null);

  const currentLang =
    LANGUAGES.find((l) => l.code === i18n.language) || LANGUAGES[0];

  const switchLang = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem("fitsphere-lang", code);
    setLangOpen(false);
  };

  // close search on outside click
  useEffect(() => {
    function handleClick(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowResults(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Search logic
  const q = query.toLowerCase().trim();

  const matchedPages = q
    ? PAGES.filter((p) => p.label.toLowerCase().includes(q))
    : [];

  const matchedClasses = q
    ? classesData
        .filter(
          (c) =>
            c.name.toLowerCase().includes(q) ||
            c.trainer.toLowerCase().includes(q),
        )
        .slice(0, 3)
    : [];

  const matchedCustomers = q
    ? customersData
        .filter(
          (c) =>
            c.name.toLowerCase().includes(q) ||
            c.email.toLowerCase().includes(q),
        )
        .slice(0, 3)
    : [];

  const hasResults =
    matchedPages.length > 0 ||
    matchedClasses.length > 0 ||
    matchedCustomers.length > 0;

  const handleSelect = (to) => {
    navigate(to);
    setQuery("");
    setShowResults(false);
  };

  return (
    <header
      className="
      fixed top-0 left-64 right-0 h-16 z-20
      bg-white/80 dark:bg-slate-900/80
      backdrop-blur-md
      border-b border-slate-100 dark:border-slate-800
      flex items-center justify-between
      px-6
    "
    >
      {/* Search */}
      <div className="relative" ref={searchRef}>
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-xl px-3 py-2 w-64">
          <Search size={15} className="text-slate-400 flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowResults(true);
            }}
            onFocus={() => setShowResults(true)}
            placeholder={t("searchPlaceholder")}
            className="bg-transparent text-sm text-slate-700 dark:text-slate-300 placeholder-slate-400 focus:outline-none w-full"
          />
          {query && (
            <button
              onClick={() => {
                setQuery("");
                setShowResults(false);
              }}
            >
              <X size={13} className="text-slate-400 hover:text-slate-600" />
            </button>
          )}
        </div>

        {/* Results Dropdown */}
        {showResults && query && (
          <div className="absolute top-full left-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 z-50 overflow-hidden">
            {!hasResults ? (
              <div className="px-4 py-6 text-center text-sm text-slate-400">
                No results for "{query}"
              </div>
            ) : (
              <div className="py-2">
                {/* Pages */}
                {matchedPages.length > 0 && (
                  <div>
                    <p className="px-4 py-1.5 text-[10px] font-display font-semibold uppercase tracking-widest text-slate-400">
                      Pages
                    </p>
                    {matchedPages.map((p) => (
                      <button
                        key={p.to}
                        onClick={() => handleSelect(p.to)}
                        className="w-full text-left px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-2"
                      >
                        <Search size={13} className="text-green-500" />
                        {p.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Classes */}
                {matchedClasses.length > 0 && (
                  <div>
                    <p className="px-4 py-1.5 text-[10px] font-display font-semibold uppercase tracking-widest text-slate-400">
                      Classes
                    </p>
                    {matchedClasses.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => handleSelect("/classes")}
                        className="w-full text-left px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      >
                        <p className="text-sm text-slate-700 dark:text-slate-300">
                          {c.name}
                        </p>
                        <p className="text-xs text-slate-400">
                          {c.trainer} · {c.time}
                        </p>
                      </button>
                    ))}
                  </div>
                )}

                {/* Customers */}
                {matchedCustomers.length > 0 && (
                  <div>
                    <p className="px-4 py-1.5 text-[10px] font-display font-semibold uppercase tracking-widest text-slate-400">
                      Customers
                    </p>
                    {matchedCustomers.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => handleSelect("/customers")}
                        className="w-full text-left px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      >
                        <p className="text-sm text-slate-700 dark:text-slate-300">
                          {c.name}
                        </p>
                        <p className="text-xs text-slate-400">{c.email}</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2">
        {/* Notification Dropdown */}
        <NotificationDropdown />

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          aria-label="Toggle dark mode"
          className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          {darkMode ? (
            <Sun size={17} className="text-green-400" />
          ) : (
            <Moon size={17} className="text-slate-500" />
          )}
        </button>

        {/* Language Switcher */}
        <div className="relative">
          <button
            onClick={() => setLangOpen((o) => !o)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Globe size={15} className="text-green-500" />
            {currentLang.label}
          </button>

          {langOpen && (
            <div className="absolute right-0 top-full mt-1 w-36 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 py-1 z-50">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => switchLang(l.code)}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center justify-between
                    ${
                      l.code === i18n.language
                        ? "text-green-600 dark:text-green-400 font-semibold"
                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                    }`}
                >
                  <span>{l.name}</span>
                  <span className="text-xs text-slate-400">{l.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
