import { cn } from "@/lib/utils";
import React from "react";

interface TableColumn<T> {
  header: string;
  accessor: (row: T) => React.ReactNode; // Function to extract cell data from row
}

interface TableProps<T> {
  columns: TableColumn<T>[]; // Column definitions
  data: T[] | undefined; // Table data
  className?: string; // Optional custom class for styling
}

const GenericTable = <T extends object>({ columns, data, className }: TableProps<T>) => {
  return (
    <table className={cn("p-1", className)}>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index} className="border px-2 py-1 text-left">
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data && data.map((row, rowIndex) => (
          <tr key={rowIndex} className="border-t">
            {columns.map((column, colIndex) => (
              <td key={colIndex} className="border px-2 py-1">
                {column.accessor(row)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GenericTable;
