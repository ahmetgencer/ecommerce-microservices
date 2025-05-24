import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI as string;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected.");
    app.listen(PORT, () => {
      console.log(`Auth service listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });
