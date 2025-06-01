import { Request, Response } from "express";
import Cart from "../models/Cart";
import axios from "axios";

// Add a product to the user's cart
export const addToCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create new cart if user has none
      cart = new Cart({
        userId,
        items: [{ productId, quantity }]
      });
    } else {
      const existingItem = cart.items.find(
        (item) => item.productId.toString() === productId
      );

      if (existingItem) {
        // If product already exists, update quantity
        existingItem.quantity += quantity;
      } else {
        // Otherwise, push new item
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({
      message: "Failed to add item to cart",
      error: (err as Error).message,
    });
  }
};

// Get the current user's cart with product details
export const getCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId;

    // Find the user's cart
    const cart = await Cart.findOne({ userId });

    // If the cart is empty or not found, return an empty array
    if (!cart || cart.items.length === 0) {
      res.status(200).json({ items: [] });
      return;
    }

    // Extract product IDs from the cart
    const productIds = cart.items.map((item) => item.productId);

    // Request product details from the product service
    const { data: products } = await axios.post("http://localhost:5000/api/products/bulk", {
      ids: productIds
    });

    // Merge product info into cart items
    const itemsWithProductDetails = cart.items.map((item) => {
      const product = products.find(
        (p: any) => p._id === item.productId.toString()
      );

      return {
        ...item.toObject(),
        product,
      };
    });

    // Respond with the cart containing detailed product info
    res.status(200).json({ items: itemsWithProductDetails });
  } catch (err) {
    res.status(500).json({
      message: "Failed to get cart",
      error: (err as Error).message,
    });
  }
};

// Remove a product from the user's cart
export const removeFromCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    const productId = req.params.productId;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      res.status(404).json({ message: "Cart not found" });
      return;
    }

    // Remove the item from cart
    const updatedItems = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    cart.set("items", updatedItems);
    await cart.save();

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({
      message: "Failed to remove item from cart",
      error: (err as Error).message,
    });
  }
};

