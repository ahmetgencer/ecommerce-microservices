import { Router } from "express";
import { addToCart, getCart, removeFromCart } from "../controllers/cartController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

// Add a product to the cart
router.post("/", authenticate, addToCart);

// Get the current user's cart
router.get("/", authenticate, getCart);

// Remove a product from the cart
router.delete("/:productId", authenticate, removeFromCart);

export default router;
