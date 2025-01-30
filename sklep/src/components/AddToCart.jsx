import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";

const AddToCart = ({ product }) => {
  const [quantity, setQuantity] = useState(1); // Default quantity is 1

  const getUserIdFromToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded.id;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  const handleCart = async () => {
    const token = localStorage.getItem("authToken");
    const userId = getUserIdFromToken(token);

    if (!userId) {
      alert("You must be logged in to add items to the cart.");
      return;
    }

    const cartItem = {
      userId: userId,
      productId: product.id,
      quantity: quantity, // Include quantity in the request
    };

    try {
      const response = await fetch("http://localhost:5000/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cartItem),
      });

      if (!response.ok) {
        throw new Error("Failed to update cart");
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  return (
    <div>
      <div className="mb-3">
        <label htmlFor="quantity" className="form-label">
          Quantity:
        </label>
        <input
          type="number"
          id="quantity"
          className="form-control"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
        />
      </div>
      <button className="btn btn-primary" onClick={handleCart}>
        Add to Cart
      </button>
    </div>
  );
};

export default AddToCart;
