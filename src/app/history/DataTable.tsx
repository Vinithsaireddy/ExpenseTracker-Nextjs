import { useReactTable, flexRender, getCoreRowModel } from "@tanstack/react-table"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { ColumnDef } from "@tanstack/react-table";

export type Transaction = {
  id: string
  type: "income" | "expense"
  amount: number
  category: string
  description: string
  date: string
}

interface DataTableProps {
  columns: ColumnDef<Transaction>[];  // Define the type for `columns`
  data: Transaction[];
}

export function DataTable({ columns, data }: DataTableProps) {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table className="w-full border border-gray-700">
      <TableHeader >
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id} className="p-2 bg-amber-300" >
                {flexRender(header.column.columnDef.header, header.getContext())}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} >
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id} className="p-2">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
