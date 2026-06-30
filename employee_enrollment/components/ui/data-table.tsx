import { ReactNode } from "react";

type Column<T> = {
  header: string;
  render: (row: T) => ReactNode;
};

type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
};

export function DataTable<T>({
  columns,
  data,
}: DataTableProps<T>) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10">
      <table className="w-full">
        <thead className="bg-white/5">
          <tr>
            {columns.map((column) => (
              <th
                key={column.header}
                className="px-5 py-4 text-left text-sm font-medium text-muted-foreground"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className="border-t border-white/5 hover:bg-white/5"
            >
              {columns.map((column) => (
                <td
                  key={column.header}
                  className="px-5 py-4"
                >
                  {column.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}