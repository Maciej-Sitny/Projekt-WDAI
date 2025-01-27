import { Router } from "express";
import {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
  getReviewsByProductId,
} from "./reviewController.js";

const router = Router();

// Get all reviews
router.get("/", getAllReviews);

// Get a single review by ID
router.get("/:id", getReviewById);

// Create a new review
router.post("/", createReview);

// Update a review by ID
router.put("/:id", updateReview);

// Delete a review by ID
router.delete("/:id", deleteReview);

router.get("/reviews/:id", getReviewsByProductId);

export default router;
