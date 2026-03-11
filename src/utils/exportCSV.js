/**
 * exportCSV
 * Converts an array of objects into a downloadable .csv file
 * @param {Object[]} data - Array of row objects
 * @param {string} filename - Output filename without extension
 */
export function exportCSV(data, filename = "export") {
  if (!data || data.length === 0) {
    console.warn("exportCSV: no data provided");
    return;
  }

  const headers = Object.keys(data[0]);

  const rows = data.map((row) =>
    headers
      .map((h) => {
        const val = row[h] ?? "";
        // wrap in quotes if value contains comma or newline
        return typeof val === "string" &&
          (val.includes(",") || val.includes("\n"))
          ? `"${val}"`
          : val;
      })
      .join(","),
  );

  const csv = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}
