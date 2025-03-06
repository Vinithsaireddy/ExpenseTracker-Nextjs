import { ColumnDef } from "@tanstack/react-table";

export type Transaction = {
  id: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  description: string;
  date: string;
};

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <span className="text-black">{row.getValue("date")}</span>,
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <span className={`px-2 py-1 rounded-md text-xs font-bold `}>
        {row.getValue("type")}
      </span>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => <span className="font-semibold">${row.getValue("amount")}</span>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <span>{row.getValue("category")}</span>,
  },
];
