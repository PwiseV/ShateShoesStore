import "./loadEnv.js";
import app from "./app.js";
import { connectDB } from './libs/db.js';

const PORT = process.env.PORT || 5001;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server bắt đầu trên cổng ${PORT}`);
  });
});
