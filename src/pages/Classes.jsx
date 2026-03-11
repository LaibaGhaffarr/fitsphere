import { useState } from "react";
import { Plus, Search } from "lucide-react";
import Table from "../components/Table";
import { classesData } from "../utils/data";
import { exportCSV } from "../utils/exportCSV";

const columns = [
  { key: "name", label: "Class Name" },
  { key: "trainer", label: "Trainer" },
  { key: "time", label: "Time" },
  {
    key: "enrolled",
    label: "Capacity",
    render: (val, row) => (
      <div className="flex items-center gap-2">
        <div className="w-24 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 rounded-full"
            style={{ width: `${(row.enrolled / row.capacity) * 100}%` }}
          />
        </div>
        <span className="text-xs text-slate-400">
          {val}/{row.capacity}
        </span>
      </div>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (val) => (
      <span
        className={`text-xs font-medium px-2.5 py-1 rounded-full ${
          val === "Full"
            ? "bg-red-50 text-red-500 dark:bg-red-900/20"
            : val === "Low"
              ? "bg-yellow-50 text-yellow-500 dark:bg-yellow-900/20"
              : "bg-green-50 text-green-600 dark:bg-green-900/20"
        }`}
      >
        {val}
      </span>
    ),
  },
];

export default function Classes() {
  const [search, setSearch] = useState("");

  const filtered = classesData.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.trainer.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            Classes
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage and monitor all gym classes.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-xl transition-colors">
          <Plus size={16} />
          Add Class
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl px-3 py-2 w-72">
          <Search size={15} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search classes or trainer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-sm text-slate-700 dark:text-slate-300 placeholder-slate-400 focus:outline-none w-full"
          />
        </div>
        <button
          onClick={() => exportCSV(classesData, "fitsphere-classes")}
          className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          Export CSV
        </button>
      </div>

      {/* Table */}
      <Table columns={columns} data={filtered} />
    </div>
  );
}
