import { useState } from "react";
import { Plus, Search } from "lucide-react";
import Table from "../components/Table";
import { customersData } from "../utils/data";
import { exportCSV } from "../utils/exportCSV";

const columns = [
  {
    key: "name",
    label: "Customer",
    render: (val, row) => (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
          {val
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <div>
          <p className="text-sm font-medium text-slate-800 dark:text-slate-100">
            {val}
          </p>
          <p className="text-xs text-slate-400">{row.email}</p>
        </div>
      </div>
    ),
  },
  {
    key: "plan",
    label: "Plan",
    render: (val) => (
      <span
        className={`text-xs font-medium px-2.5 py-1 rounded-full ${
          val === "Premium"
            ? "bg-purple-50 text-purple-600 dark:bg-purple-900/20"
            : val === "Annual"
              ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20"
              : "bg-slate-100 text-slate-600 dark:bg-slate-800"
        }`}
      >
        {val}
      </span>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (val) => (
      <div className="flex items-center gap-1.5">
        <div
          className={`w-1.5 h-1.5 rounded-full ${
            val === "Active" ? "bg-green-500" : "bg-slate-300 dark:bg-slate-600"
          }`}
        />
        <span
          className={`text-sm ${
            val === "Active"
              ? "text-green-600 dark:text-green-400"
              : "text-slate-400"
          }`}
        >
          {val}
        </span>
      </div>
    ),
  },
  { key: "joined", label: "Joined" },
];

export default function Customers() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = customersData.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || c.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            Customers
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            View and manage your member database.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-xl transition-colors">
          <Plus size={16} />
          Add Customer
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        {/* Search */}
        <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl px-3 py-2 w-72">
          <Search size={15} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-sm text-slate-700 dark:text-slate-300 placeholder-slate-400 focus:outline-none w-full"
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Filter Tabs */}
          {["All", "Active", "Inactive"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-xl transition-colors ${
                filter === tab
                  ? "bg-green-500 text-white"
                  : "bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              {tab}
            </button>
          ))}

          {/* Export */}
          <button
            onClick={() => exportCSV(customersData, "fitsphere-customers")}
            className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Export CSV
          </button>
        </div>
      </div>

      {/* Summary */}
      <p className="text-xs text-slate-400">
        Showing{" "}
        <span className="font-semibold text-slate-600 dark:text-slate-300">
          {filtered.length}
        </span>{" "}
        of {customersData.length} customers
      </p>

      {/* Table */}
      <Table columns={columns} data={filtered} />
    </div>
  );
}
