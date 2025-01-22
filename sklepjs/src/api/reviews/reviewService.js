import Review from "./reviewModel.js";

export const getAllReviews = async () => {
  return await Review.findAll();
};

export const getReviewById = async (id) => {
  return await Review.findByPk(id);
};

export const createReview = async (reviewData) => {
  return await Review.create(reviewData);
};

export const updateReview = async (id, reviewData) => {
  const review = await Review.findByPk(id);
  if (!review) {
    throw new Error("Review not found");
  }
  return await review.update(reviewData);
};

export const deleteReview = async (id) => {
  const review = await Review.findByPk(id);
  if (!review) {
    throw new Error("Review not found");
  }
  return await review.destroy();
};

export const getReviewsByProductId = async (productId) => {
  return await Review.findAll({ where: { productId } });
};
