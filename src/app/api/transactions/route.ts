import { auth } from "@clerk/nextjs/server";  // ✅ Import Clerk auth
import { Transaction } from "@/models/transaction";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";

// 🟢 GET: Fetch transactions for the logged-in user
export async function GET(req: Request) {
  try {
    await connectDB();

    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    const { userId } = await auth(); // Use token for auth

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const transactions = await Transaction.find({ userId });
    return NextResponse.json(transactions, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 });
  }
}

// 🔵 POST: Add a new transaction
export async function POST(req: Request) {
  try {
    await connectDB();
    
    const { userId } = await auth(); // ✅ Ensure we get userId
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { amount, type, category } = await req.json();
    if (!amount || !type || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    console.log("UserId:", userId); // 🔵 Debugging: Check if userId is present

    const transaction = new Transaction({ userId, amount, type, category });
    await transaction.save();

    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    console.error("Error adding transaction:", error); // 🔴 Log errors
    return NextResponse.json({ error: "Failed to add transaction" }, { status: 500 });
  }
}
