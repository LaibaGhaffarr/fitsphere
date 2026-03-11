import { useTranslation } from "react-i18next";
import { Users, Dumbbell, DollarSign, TrendingDown } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import Card from "../components/Card";
import {
  statsData,
  revenueData,
  membersData,
  classesData,
} from "../utils/data";

const ICONS = [Users, Dumbbell, DollarSign, TrendingDown];

export default function Dashboard() {
  const { t } = useTranslation();

  const STATS = [
    { label: t("totalMembers"), value: "1,284", change: "+12%", trend: "up" },
    { label: t("activeClasses"), value: "38", change: "+4%", trend: "up" },
    { label: t("monthlyRevenue"), value: "$24.5k", change: "+8%", trend: "up" },
    { label: t("churnRate"), value: "2.4%", change: "-0.3%", trend: "down" },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
          {t("dashboard")}
        </h1>
        <p className="text-sm text-slate-400 mt-1">{t("dashboardSubtitle")}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {STATS.map((stat, i) => (
          <Card
            key={stat.label}
            title={stat.label}
            value={stat.value}
            change={stat.change}
            trend={stat.trend}
            icon={ICONS[i]}
          />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Revenue Chart */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5">
          <h3 className="font-display font-semibold text-slate-800 dark:text-white mb-1">
            {t("monthlyRevenueChart")}
          </h3>
          <p className="text-xs text-slate-400 mb-4">{t("last6Months")}</p>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #f1f5f9",
                  borderRadius: "12px",
                  fontSize: "12px",
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#22c55e"
                strokeWidth={2}
                fill="url(#revenueGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Members Chart */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5">
          <h3 className="font-display font-semibold text-slate-800 dark:text-white mb-1">
            {t("memberGrowth")}
          </h3>
          <p className="text-xs text-slate-400 mb-4">{t("last6Months")}</p>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={membersData}>
              <defs>
                <linearGradient id="membersGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #f1f5f9",
                  borderRadius: "12px",
                  fontSize: "12px",
                }}
              />
              <Area
                type="monotone"
                dataKey="members"
                stroke="#6366f1"
                strokeWidth={2}
                fill="url(#membersGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Classes */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5">
        <h3 className="font-display font-semibold text-slate-800 dark:text-white mb-4">
          {t("recentClasses")}
        </h3>
        <div className="space-y-3">
          {classesData.slice(0, 4).map((cls) => (
            <div
              key={cls.id}
              className="flex items-center justify-between py-2 border-b border-slate-50 dark:border-slate-800 last:border-0"
            >
              <div>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-100">
                  {cls.name}
                </p>
                <p className="text-xs text-slate-400">
                  {cls.trainer} · {cls.time}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400">
                  {cls.enrolled}/{cls.capacity}
                </span>
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    cls.status === "Full"
                      ? "bg-red-50 text-red-500 dark:bg-red-900/20"
                      : cls.status === "Low"
                        ? "bg-yellow-50 text-yellow-500 dark:bg-yellow-900/20"
                        : "bg-green-50 text-green-600 dark:bg-green-900/20"
                  }`}
                >
                  {cls.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
