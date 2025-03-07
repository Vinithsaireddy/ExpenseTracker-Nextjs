import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in environment variables");
}

interface CachedConnection {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
}

// Define global type properly
declare global {
  // Use "globalThis" for defining types globally
  var mongoose: CachedConnection | undefined;
}

// Use a proper global reference
const cached: CachedConnection = globalThis.mongoose ?? { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: "expenseTracker",
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as mongoose.ConnectOptions)
      .then((mongooseInstance) => mongooseInstance.connection);
  }

  cached.conn = await cached.promise;
  globalThis.mongoose = cached; // Store the connection globally
  return cached.conn;
}
