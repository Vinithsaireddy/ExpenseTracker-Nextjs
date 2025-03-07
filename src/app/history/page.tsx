"use client"

import { useState, useEffect } from "react";
import { DataTable } from "./DataTable";
import { columns } from "./columns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

// Define a proper Transaction type
interface Transaction {
  id: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  description: string;
  date: string;
}

export default function History() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filterType, setFilterType] = useState<string>("all");
  const [filterDate, setFilterDate] = useState<string>("");

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await fetch("/api/transactions");
        if (!response.ok) throw new Error("Failed to fetch transactions");

        const data = await response.json();
        
        // Ensure the correct type and format the data
        const formattedData: Transaction[] = data.map((txn: { _id: string; type: string; amount: number; category: string; description: string; createdAt: string }) => ({
          id: txn._id,
          type: txn.type,
          amount: txn.amount,
          category: txn.category,
          description: txn.description,
          date: new Date(txn.createdAt).toLocaleDateString(),
        }));

        setTransactions(formattedData);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        // Optionally display a user-friendly message, e.g., via a toast or alert
      }
    }

    fetchTransactions();
  }, []);

  const filteredData = transactions
    .filter((txn) =>
      (filterType === "all" || txn.type === filterType) &&
      (filterDate === "" || txn.date.startsWith(filterDate)) // Ensure the date filter works correctly
    );

  return (
    <div className="p-6 bg-white text-black rounded-lg shadow-lg border border-gray-300 w-3xl">
      <h1 className="text-2xl font-bold mb-4 text-center">Transaction History</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 justify-center">
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-40 bg-blue-100 text-black border border-gray-400">
            <SelectValue placeholder="Filter by Type" />
          </SelectTrigger>
          <SelectContent className="bg-white text-black border">
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="income">Income</SelectItem>
            <SelectItem value="expense">Expense</SelectItem>
          </SelectContent>
        </Select>

        {/* Date filter */}
        <Input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="w-40 bg-blue-100 text-black border border-gray-400"
        />
      </div>

      {/* Transactions Table */}
      {filteredData.length === 0 ? (
        <p className="text-center text-gray-500">No transactions found</p>
      ) : (
        <DataTable columns={columns} data={filteredData} />
      )}
    </div>
  );
}
