export default function Table({ columns = [], data = [] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-100 dark:border-slate-800">
      <table className="w-full text-sm">
        {/* Head */}
        <thead>
          <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-5 py-3.5 text-left text-[11px] font-display font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-5 py-10 text-center text-slate-400 dark:text-slate-600"
              >
                No data available.
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr
                key={i}
                className="bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="px-5 py-3.5 text-slate-700 dark:text-slate-300"
                  >
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
