import express from "express";
import {
  getAllProducts,
  getProductById,
  getProductByName,
  createProduct,
  updateProduct,
  patchProduct,
  deleteProduct,
} from "../controllers/productController";
import Product from "../models/Product";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/name/:name", getProductByName);
router.get("/:id", getProductById);
router.post("/bulk", async (req, res) => {
  try {
    const { ids } = req.body; // array of product IDs
    const products = await Product.find({ _id: { $in: ids } });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products", error: err });
  }
});

router.post("/", createProduct);
router.put("/:id", updateProduct);
router.patch("/:id", patchProduct);
router.delete("/:id", deleteProduct);

export default router;
