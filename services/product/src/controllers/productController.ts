import { Request, Response } from "express";
import Product from "../models/Product";

// GET all
export const getAllProducts = async (_req: Request, res: Response) => {
  const products = await Product.find();
  res.json(products);
};

// GET by ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.json(product);
  } catch {
    res.status(400).json({ message: "Invalid ID" });
  }
};

// GET by Name
export const getProductByName = async (req: Request, res: Response) => {
  const name = req.params.name;
  const product = await Product.findOne({ name: { $regex: new RegExp(name, "i") } });
  if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
  res.json(product);
};

// POST new
export const createProduct = async (req: Request, res: Response) => {
  const newProduct = new Product(req.body);
  const saved = await newProduct.save();
  res.status(201).json(saved);
};

// PUT full update
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, overwrite: true });
    if (!updated) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.json(updated);
  } catch {
    res.status(400).json({ message: "Invalid request" });
  }
};

// PATCH partial update
export const patchProduct = async (req: Request, res: Response) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.json(updated);
  } catch {
    res.status(400).json({ message: "Invalid request" });
  }
};

// DELETE
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.json({ message: "Product deleted" });
  } catch {
    res.status(400).json({ message: "Invalid ID" });
  }
};
