import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui';
import { useState } from 'react';
import { DataTableViewOptions } from './data-table-view-option';
import { DataTableActions } from './data-table-action';
import { DataTableColumnHeader } from './data-table-header';
import { formatNumber, formatShortDate } from '@/lib/utils';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  downloadLink: string;
  children?: React.ReactNode;
}

export function DataTable<TData, TValue>({ columns, data, downloadLink, children }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    columnResizeMode: 'onChange',
    columnResizeDirection: 'ltr',
    manualFiltering: true,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnVisibility,
    },
  });

  return (
    <div className="rounded-md border ">
      <div className="flex justify-end items-center p-2 border-b">
        <div className="flex items-center gap-3">
          <DataTableActions href={downloadLink} />
          {children}
          <DataTableViewOptions table={table} />
        </div>
      </div>
      <Table
        {...{
          style: {
            width: table.getCenterTotalSize(),
          },
        }}>
        <TableHeader className="sticky top-0 bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="text-sm font-medium text-black-500 border justify-between relative"
                    {...{
                      colSpan: header.colSpan,
                      style: {
                        width: header.getSize(),
                      },
                    }}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}

                    <div
                      {...{
                        onDoubleClick: () => header.column.resetSize(),
                        onMouseDown: header.getResizeHandler(),
                        onTouchStart: header.getResizeHandler(),
                        className: `z-50 absolute top-0  h-full w-1 bg-black-500 cursor-col-resize right-0 select-none touch-none ${header.column.getIsResizing() ? 'bg-blue-500 opacity-100' : ''}`,
                      }}></div>
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'} className="text-sm h-1 p-0 m-0">
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    className="border bg-white text-pretty"
                    key={cell.id}
                    {...{
                      style: {
                        width: cell.column.getSize(),
                      },
                    }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export function setDataTableColumns(columns: Record<string, { title: string; type: string }>): ColumnDef<any>[] {
  return Object.entries(columns).map(([key, value]) => {
    const _columns: ColumnDef<any> = {
      header: ({ column }) => <DataTableColumnHeader column={column} title={value.title} />,
      accessorKey: key,
      enableResizing: true,
      meta: { title: value.title },
    };

    if (value.type === 'currency') {
      Object.assign(_columns, {
        cell: ({ row }) => {
          const amount = parseFloat(row.getValue(key));
          const formatted = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'PHP',
          }).format(amount);

          return row.getValue(key) ? <div className="text-right font-medium">{formatted}</div> : '';
        },
      });
    } else if (value.type === 'number') {
      Object.assign(_columns, {
        cell: ({ row }) => (formatNumber(row.getValue(key)) ? <div className="text-right">{formatNumber(row.getValue(key))}</div> : ''),
      });
    } else if (value.type === 'date') {
      Object.assign(_columns, {
        cell: ({ row }) => (row.getValue(key) ? formatShortDate(row.getValue(key)) : ''),
      });
    }

    return _columns;
  });
}
