import { Router } from "express";
import {
  addToCart,
  getCart,
  deleteCartItem,
  clearCart,
  login,
  register,
  getAllOrders,
  getOrderById,
  createOrder,
  addReview,
  getReviews,
  deleteReview,
  editReview,
} from "./apiController.js";
const router = Router();
import authMiddleware from "./authMiddleware.js";

// Authentication routes
router.post("/login", login);
router.post("/register", register);

// Orders routes
router.get("/orders/:userId", authMiddleware, getAllOrders);
router.get("/orders/:id", authMiddleware, getOrderById);
router.post("/orders", authMiddleware, createOrder);

// Cart routes
router.post("/cart", authMiddleware, addToCart);
router.get("/cart/:userId", authMiddleware, getCart);
router.delete("/cart/:userId/:productId", authMiddleware, deleteCartItem);
router.delete("/cart/:userId", authMiddleware, clearCart);

// Reviews routes
router.post("/reviews", authMiddleware, addReview);
router.get("/reviews/:productId", getReviews);
router.delete("/reviews/:reviewId", authMiddleware, deleteReview);
router.put("/reviews/:reviewId", authMiddleware, editReview);

export default router;
