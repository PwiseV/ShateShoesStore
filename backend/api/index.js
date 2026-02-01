import app from "../src/app.js";
import { connectDB } from '../src/libs/db.js';

// Connect to DB once (Vercel will reuse connection)
let isConnected = false;

const connectToDatabase = async () => {
  if (isConnected) {
    return;
  }
  await connectDB();
  isConnected = true;
};

// Export handler for Vercel
export default async (req, res) => {
  await connectToDatabase();
  return app(req, res);
};
