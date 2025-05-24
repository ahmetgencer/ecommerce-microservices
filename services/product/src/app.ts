import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes";

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (_req, res) => {
  res.send({ status: "Product service is running" });
});

// Product routes
app.use("/api/products", productRoutes);

export default app;
