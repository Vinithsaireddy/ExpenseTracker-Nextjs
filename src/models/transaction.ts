import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true }, // ✅ Ensure userId is required
    amount: { type: Number, required: true },
    type: { type: String, enum: ["income", "expense"], required: true },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

export const Transaction =
  mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);
