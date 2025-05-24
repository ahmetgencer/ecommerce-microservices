import { Router } from "express";
import { register, login } from "../controllers/authController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);

// ✅ Korumalı route
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Access granted to protected route",
    user: (req as any).user, // token decode edilip buraya geliyor
  });
});

export default router;
