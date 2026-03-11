export default function Card({
  title,
  value,
  change,
  trend,
  icon: Icon,
  className = "",
}) {
  return (
    <div
      className={`
      bg-white dark:bg-slate-900
      border border-slate-100 dark:border-slate-800
      rounded-2xl p-5 shadow-sm
      hover:shadow-md transition-shadow duration-200
      ${className}
    `}
    >
      <div className="flex items-start justify-between">
        {/* Left — title + value */}
        <div className="flex flex-col gap-1">
          <p className="text-xs font-display font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            {title}
          </p>
          <p className="text-2xl font-display font-bold text-slate-900 dark:text-white">
            {value}
          </p>
          {change && (
            <span
              className={`text-xs font-medium ${
                trend === "up" ? "text-green-500" : "text-red-400"
              }`}
            >
              {change} vs last month
            </span>
          )}
        </div>

        {/* Right — icon */}
        {Icon && (
          <div className="w-10 h-10 rounded-xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
            <Icon size={20} className="text-green-500" strokeWidth={1.8} />
          </div>
        )}
      </div>
    </div>
  );
}
