import { User, Order, Cart, Review } from "./apiModel.js";
import jwt from "jsonwebtoken";

const SECRET_KEY = "7s2kFJvL3nMeQ8R1Pz0XyW4vT9gB6dCjH5aN1mOoV2k";

export const login = async (credentials) => {
  try {
    const user = await User.findOne({
      where: { email: credentials.email, password: credentials.password },
    });

    if (!user) {
      throw new Error("Invalid credentials.");
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    return { user, token };
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const register = async (userData) => {
  try {
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const getAllOrders = async (userId) => {
  try {
    const orders = await Order.findAll({ where: userId });
    return orders;
  } catch (error) {
    console.error(`Error fetching orders for user with ID ${userId}:`, error);
    throw error;
  }
};

export const getOrderById = async (orderId) => {
  try {
    const order = await Order.findByPk(orderId);
    if (!order) {
      throw new Error("Order not found.");
    }
    return order;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
};

export const createOrder = async (orderData) => {
  try {
    const newOrder = await Order.create(orderData);
    return newOrder;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const updateCartItemQuantityService = async (
  userId,
  productId,
  quantity
) => {
  try {
    // Find the cart item for the given user and product
    const cartItem = await Cart.findOne({ where: { userId, productId } });

    // If the cart item doesn't exist, throw an error
    if (!cartItem) {
      throw new Error("Cart item not found");
    }

    // Update the quantity
    cartItem.quantity = quantity;
    await cartItem.save();

    // Return the updated cart item
    return cartItem;
  } catch (error) {
    console.error("Error updating cart item quantity in service:", error);
    throw error; // Re-throw the error for the controller to handle
  }
};

export const addToCart = async (cartData) => {
  try {
    const { userId, productId, quantity } = cartData;

    // Sprawdź, czy produkt już istnieje w koszyku użytkownika
    const existingCartItem = await Cart.findOne({
      where: { userId, productId },
    });

    if (existingCartItem) {
      // Jeśli produkt już istnieje, zaktualizuj ilość
      existingCartItem.quantity += quantity;
      await existingCartItem.save();
      return existingCartItem;
    } else {
      // Jeśli produkt nie istnieje, dodaj nowy wpis do koszyka
      const newCartItem = await Cart.create(cartData);
      return newCartItem;
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};

export const getCart = async (userId) => {
  try {
    // Find all cart items for the given user
    const cartItems = await Cart.findAll({ where: { userId } });

    // If no cart items are found, return an empty array
    if (!cartItems || cartItems.length === 0) {
      return [];
    }

    // Return the cart items
    return cartItems;
  } catch (error) {
    console.error("Error fetching cart items in service:", error);
    throw error; // Re-throw the error for the controller to handle
  }
};

export const deleteCartItem = async (userId, productId) => {
  try {
    const result = await Cart.destroy({ where: { userId, productId } });
    if (result === 0) {
      throw new Error(
        `Cart item not found for user ID ${userId} and product ID ${productId}`
      );
    }
    return { message: "Cart item deleted successfully" };
  } catch (error) {
    console.error(
      `Error deleting cart item for user ID ${userId} and product ID ${productId}:`,
      error
    );
    throw error;
  }
};

export const clearCart = async (userId) => {
  try {
    const result = await Cart.destroy({ where: { userId } });
    if (result === 0) {
      throw new Error(`No cart items found for user with ID ${userId}`);
    }
    return { message: "Cart cleared successfully" };
  } catch (error) {
    console.error(`Error clearing cart for user with ID ${userId}:`, error);
    throw error;
  }
};

// Reviews functionality
export const checkUserReview = async (userId, productId) => {
  try {
    const review = await Review.findOne({ where: { userId, productId } });
    return review !== null;
  } catch (error) {
    console.error("Error checking user review:", error);
    throw error;
  }
};

export const addReviewService = async (reviewData) => {
  try {
    const { userId, productId } = reviewData;

    // Check if the user has already reviewed this product
    const existingReview = await Review.findOne({
      where: { userId, productId },
    });
    if (existingReview) {
      throw new Error("User has already reviewed this product.");
    }

    // Add the new review
    const newReview = await Review.create(reviewData);
    return newReview;
  } catch (error) {
    console.error("Error adding review:", error);
    throw error;
  }
};

export const getReviewsService = async (productId) => {
  try {
    const reviews = await Review.findAll({ where: { productId } });
    return reviews;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};

export const deleteReviewService = async (userId, productId, isAdmin) => {
  try {
    // Znajdź opinię do usunięcia
    const review = await Review.findOne({ where: { userId, productId } });
    if (!review) {
      throw new Error("Review not found.");
    }

    // Usuń opinię
    await review.destroy();
    return { message: "Review deleted successfully." };
  } catch (error) {
    console.error("Error deleting review:", error);
    throw error;
  }
};

// Add the editReview function
export const editReviewService = async (userId, productId, reviewData) => {
  try {
    // Znajdź opinię do edycji
    const review = await Review.findOne({ where: { userId, productId } });
    if (!review) {
      throw new Error("Review not found.");
    }

    // Zaktualizuj opinię
    await review.update(reviewData);
    return review;
  } catch (error) {
    console.error("Error editing review:", error);
    throw error;
  }
};

export const getReviewByUserAndProductService = async (userId, productId) => {
  try {
    const review = await Review.findOne({ where: { userId, productId } });
    return review;
  } catch (error) {
    console.error("Error fetching review:", error);
    throw error;
  }
};
