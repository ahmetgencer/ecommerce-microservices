import express from "express";
import cors from "cors";
import cartRoutes from "./routes/cartRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.send({ status: "Cart service is running" });
});

app.use("/api/cart", cartRoutes);

export default app;
