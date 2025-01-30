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
  updateCartItemQuantity,
  getReviewByUserAndProduct,
} from "./apiController.js";
const router = Router();
import authMiddleware from "./authMiddleware.js";

// Authentication routes
router.post("/login", login);
router.post("/register", register);

// Orders routes
router.get("/orders/user/:userId", authMiddleware, getAllOrders);
router.get("/orders/order/:id", authMiddleware, getOrderById);
router.post("/orders", authMiddleware, createOrder);

// Cart routes
router.post("/cart", authMiddleware, addToCart);
router.get("/cart/:userId", authMiddleware, getCart);
router.delete("/cart/:userId/:productId", authMiddleware, deleteCartItem);
router.delete("/cart/:userId", authMiddleware, clearCart);
router.put("/cart/:userId/:productId", authMiddleware, updateCartItemQuantity);

// Reviews routes
router.post("/reviews", authMiddleware, addReview); // Dodaj opinię
router.put("/reviews/:userId/:productId", authMiddleware, editReview);
router.delete("/reviews/:userId/:productId", authMiddleware, deleteReview); // Usuń opinię
router.get("/reviews/:productId", getReviews); // Pobierz opinie dla produktu
router.get("/reviews/:userId/:productId", getReviewByUserAndProduct); // Pobierz opinię użytkownika dla produktu

export default router;
