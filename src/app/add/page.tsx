"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AddTransaction() {

  const [formData, setFormData] = useState({
    amount: "",
    category: "Food",
    type: "expense",
    note: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    // If category is "Other", store note value instead
    const finalData = {
      amount: formData.amount,
      type: formData.type,
      category: formData.category === "Other" ? formData.note : formData.category,
    };

    const response = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(finalData),
    });

    if (response.ok) {
      alert("Transaction added successfully!");
      setFormData({ amount: "", category: "Food", type: "expense", note: "" });
    } else {
      alert("Error adding transaction!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Add Transaction</CardTitle>
          <CardDescription>Enter your income or expense details.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Transaction Type */}
            <div className="flex flex-col space-y-1.5">
              <Label>Type</Label>
              <Select onValueChange={(value) => handleSelectChange("type", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="expense">Expense</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Category */}
            <div className="flex flex-col space-y-1.5">
              <Label>Category</Label>
              <Select
                onValueChange={(value) => handleSelectChange("category", value)}
                defaultValue="Food"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Food">Food</SelectItem>
                  <SelectItem value="Rent">Rent</SelectItem>
                  <SelectItem value="Transport">Transport</SelectItem>
                  <SelectItem value="Salary">Salary</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Note Field (Only When "Other" is Selected) */}
            {formData.category === "Other" && (
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="note">Category Name</Label>
                <Input
                  id="note"
                  name="note"
                  placeholder="Enter category name"
                  value={formData.note}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            {/* Amount */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                placeholder="Enter amount"
                value={formData.amount}
                onChange={handleChange}
                required
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handleSubmit} className="w-full max-w-xs">Add Transaction</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
