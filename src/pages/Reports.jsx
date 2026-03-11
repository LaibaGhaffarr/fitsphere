import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { exportCSV } from "../utils/exportCSV";
import {
  revenueData,
  membersData,
  classesData,
  customersData,
} from "../utils/data";

const PLAN_DATA = [
  {
    name: "Premium",
    value: customersData.filter((c) => c.plan === "Premium").length,
  },
  {
    name: "Basic",
    value: customersData.filter((c) => c.plan === "Basic").length,
  },
  {
    name: "Annual",
    value: customersData.filter((c) => c.plan === "Annual").length,
  },
];

const COLORS = ["#22c55e", "#6366f1", "#f59e0b"];

export default function Reports() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            Reports
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Analytics, charts and data exports.
          </p>
        </div>

        {/* Export Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => exportCSV(revenueData, "fitsphere-revenue")}
            className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Export Revenue
          </button>
          <button
            onClick={() => exportCSV(customersData, "fitsphere-customers")}
            className="px-4 py-2 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded-xl transition-colors"
          >
            Export Customers
          </button>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Revenue Bar Chart */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5">
          <h3 className="font-display font-semibold text-slate-800 dark:text-white mb-1">
            Revenue Overview
          </h3>
          <p className="text-xs text-slate-400 mb-4">Last 6 months</p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={revenueData}>
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
              <Bar dataKey="revenue" fill="#22c55e" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Members Bar Chart */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5">
          <h3 className="font-display font-semibold text-slate-800 dark:text-white mb-1">
            Member Growth
          </h3>
          <p className="text-xs text-slate-400 mb-4">Last 6 months</p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={membersData}>
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
              <Bar dataKey="members" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Pie Chart — Plan Distribution */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5">
          <h3 className="font-display font-semibold text-slate-800 dark:text-white mb-1">
            Plan Distribution
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            Members by subscription plan
          </p>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={PLAN_DATA}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
                dataKey="value"
              >
                {PLAN_DATA.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #f1f5f9",
                  borderRadius: "12px",
                  fontSize: "12px",
                }}
              />
              <Legend
                iconType="circle"
                iconSize={8}
                formatter={(value) => (
                  <span style={{ fontSize: "12px", color: "#94a3b8" }}>
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Class Enrollment Summary */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5">
          <h3 className="font-display font-semibold text-slate-800 dark:text-white mb-1">
            Class Enrollment
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            Enrolled vs capacity per class
          </p>
          <div className="space-y-3 mt-2">
            {classesData.map((cls) => (
              <div key={cls.id}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600 dark:text-slate-300 font-medium">
                    {cls.name}
                  </span>
                  <span className="text-slate-400">
                    {cls.enrolled}/{cls.capacity}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      cls.enrolled / cls.capacity === 1
                        ? "bg-red-400"
                        : cls.enrolled / cls.capacity > 0.7
                          ? "bg-green-500"
                          : "bg-yellow-400"
                    }`}
                    style={{ width: `${(cls.enrolled / cls.capacity) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
