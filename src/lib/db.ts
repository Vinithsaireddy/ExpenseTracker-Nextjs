import mongoose, { Connection, ConnectOptions } from "mongoose";

const MONGODB_URI: string = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in environment variables");
}

// Define a cached connection type
interface CachedConnection {
  conn: Connection | null;
  promise: Promise<Connection> | null;
}

// Use globalThis properly with type-safe caching
const globalWithMongoose = globalThis as typeof globalThis & { mongooseCache?: CachedConnection };

const cached: CachedConnection = globalWithMongoose.mongooseCache ?? { conn: null, promise: null };

export async function connectDB(): Promise<Connection> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: "expenseTracker",
      } as ConnectOptions) // Removed outdated options
      .then((mongooseInstance) => mongooseInstance.connection);
  }

  cached.conn = await cached.promise;
  globalWithMongoose.mongooseCache = cached; // Store in global scope

  return cached.conn;
}
