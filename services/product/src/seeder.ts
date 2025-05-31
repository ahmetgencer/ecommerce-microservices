import mongoose from "mongoose";
import dotenv from "dotenv";
import products from "./data/products";
import { Product } from "./models/Product";
import { connectDB } from "./config/connectDB";

dotenv.config();

const seedProducts = async () => {
  try {
    await connectDB();
    await Product.deleteMany();
    const created = await Product.insertMany(products);
    console.log(`Inserted ${created.length} products.`);
    process.exit();
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

seedProducts();
