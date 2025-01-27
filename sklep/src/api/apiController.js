import {
  login as loginService,
  register as registerService,
  getAllOrders as getAllOrdersService,
  getOrderById as getOrderByIdService,
  createOrder as createOrderService,
  addToCart as addToCartService,
  getCart as getCartService,
  deleteCartItem as deleteCartItemService,
  clearCart as clearCartService,
  addReview as addReviewService,
  getReviews as getReviewsService,
  deleteReview as deleteReviewService,
  editReview as editReviewService,
} from "./apiService.js";

// apiController.js

export const login = async (req, res) => {
  try {
    const credentials = req.body;
    const data = await loginService(credentials);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

export const register = async (req, res) => {
  try {
    const userData = req.body;
    const data = await registerService(userData);
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const userId = req.params;
    const data = await getAllOrdersService(userId);
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching orders", error: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getOrderByIdService(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: `Error fetching order with ID ${id}`,
      error: error.message,
    });
  }
};

export const createOrder = async (req, res) => {
  try {
    const orderData = req.body;
    const data = await createOrderService(orderData);
    res.status(201).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating order", error: error.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const cartData = req.body;
    const data = await addToCartService(cartData);
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding to cart", error: error.message });
  }
};

export const getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const data = await getCartService(userId);
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching cart", error: error.message });
  }
};

export const deleteCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const data = await deleteCartItemService(userId, productId);
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting cart item", error: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const data = await clearCartService(userId);
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error clearing cart", error: error.message });
  }
};

// Reviews routes
export const addReview = async (req, res) => {
  try {
    const reviewData = req.body;
    const data = await addReviewService(reviewData);
    res.status(201).json(data);
  } catch (error) {
    if (error.message === "User has already reviewed this product") {
      res.status(400).json({ message: error.message });
    } else {
      res
        .status(500)
        .json({ message: "Error adding review", error: error.message });
    }
  }
};

export const getReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const data = await getReviewsService(productId);
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching reviews", error: error.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const data = await deleteReviewService(userId, productId);
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting review", error: error.message });
  }
};

export const editReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const reviewData = req.body;
    const data = await editReviewService(reviewId, reviewData);
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error editing review", error: error.message });
  }
};
