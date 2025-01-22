import {
  getAllReviews as getAllReviewsService,
  getReviewById as getReviewByIdService,
  createReview as createReviewService,
  updateReview as updateReviewService,
  deleteReview as deleteReviewService,
  getReviewsByProductId as getReviewsByProductIdService,
} from "./reviewService.js";

// Get all reviews
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await getAllReviewsService();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single review by ID
export const getReviewById = async (req, res) => {
  try {
    const review = await getReviewByIdService(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new review
export const createReview = async (req, res) => {
  try {
    const newReview = await createReviewService(req.body);
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a review by ID
export const updateReview = async (req, res) => {
  try {
    const updatedReview = await updateReviewService(req.params.id, req.body);
    if (!updatedReview) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.json(updatedReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a review by ID
export const deleteReview = async (req, res) => {
  try {
    await deleteReviewService(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getReviewsByProductId = async (req, res) => {
  try {
    const reviews = await getReviewsByProductIdService(req.params.id);
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
