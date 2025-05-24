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

const router = express.Router();

router.get("/", getAllProducts);
router.get("/name/:name", getProductByName);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.patch("/:id", patchProduct);
router.delete("/:id", deleteProduct);

export default router;
