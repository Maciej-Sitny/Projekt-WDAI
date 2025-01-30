import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";

const AddToCart = ({ product }) => {
  const [quantity, setQuantity] = useState(1); // Domyślna ilość to 1
  const [message, setMessage] = useState(""); // Powiadomienie o dodaniu do koszyka

  const getUserIdFromToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded.id;
    } catch (error) {
      console.error("Błąd podczas dekodowania tokena:", error);
      return null;
    }
  };

  const handleCart = async () => {
    const token = localStorage.getItem("authToken");
    const userId = getUserIdFromToken(token);

    if (!userId) {
      alert("Musisz być zalogowany, aby dodać produkt do koszyka.");
      return;
    }

    const cartItem = {
      userId: userId,
      productId: product.id,
      quantity: quantity, // Uwzględnienie ilości w żądaniu
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
        throw new Error("Nie udało się dodać do koszyka");
      }

      setMessage("Produkt został dodany do koszyka!");
      setTimeout(() => setMessage(""), 3000); // Ukryj powiadomienie po 3 sekundach
    } catch (error) {
      console.error("Błąd podczas dodawania do koszyka:", error);
    }
  };

  return (
    <div>
      <div className="mb-3">
        <label htmlFor="quantity" className="form-label">
          Ilość:
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
      <button className="btn btn-warning" onClick={handleCart}>
        Dodaj do koszyka
      </button>

      {message && (
        <div className="alert alert-success mt-3" role="alert">
          {message}
        </div>
      )}
    </div>
  );
};

export default AddToCart;
