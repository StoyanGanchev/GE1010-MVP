import type { ReactNode } from 'react';

export interface TableColumn<T> {
  header: string;
  accessor: (row: T, index: number) => ReactNode;
  className?: string;
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  emptyState?: ReactNode;
  caption?: string;
}

export const Table = <T,>({ columns, data, emptyState, caption }: TableProps<T>): JSX.Element => {
  if (!data.length && emptyState) {
    return <div className="text-sm text-slate-600">{emptyState}</div>;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        {caption ? <caption className="sr-only">{caption}</caption> : null}
        <thead className="bg-slate-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.header}
                scope="col"
                className={`px-4 py-3 text-left font-semibold uppercase tracking-wide text-slate-500 ${column.className ?? ''}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-slate-50">
              {columns.map((column) => (
                <td key={column.header} className={`px-4 py-3 text-slate-700 ${column.className ?? ''}`}>
                  {column.accessor(row, rowIndex)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
