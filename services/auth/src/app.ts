import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (_req, res) => {
  res.send({ status: "Auth service is running" });
});

// Auth routes
app.use("/api/auth", authRoutes);

export default app;
