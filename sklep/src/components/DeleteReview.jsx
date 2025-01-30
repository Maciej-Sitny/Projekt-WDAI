import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const DeleteReview = ({ userId, productId, isAdmin }) => {
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    // Pobierz ID obecnie zalogowanego użytkownika z tokenu
    const token = localStorage.getItem("authToken");
    if (token) {
      const decoded = jwtDecode(token);
      setCurrentUserId(decoded.id);
    }
  }, []);

  const handleDelete = async () => {
    try {
      console.log("Current User ID:", currentUserId);
      console.log("Review User ID:", userId);
      console.log("Is Admin:", isAdmin);

      const response = await fetch(
        `http://localhost:5000/api/reviews/${userId}/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify({ isAdmin }), // Przekazujemy flagę isAdmin do backendu
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete review.");
      }

      const data = await response.json();
      console.log("Review deleted successfully:", data);
      window.location.reload(); // Odśwież stronę po usunięciu opinii
    } catch (error) {
      console.error("Error deleting review:", error);
      alert("Failed to delete review. Please try again.");
    }
  };

  // Sprawdź, czy użytkownik ma uprawnienia do usunięcia opinii
  const canDelete = isAdmin || currentUserId === userId;

  // Renderuj przycisk usuwania tylko, jeśli użytkownik ma uprawnienia
  return canDelete ? (
    <button
      className="btn btn-danger btn-sm"
      onClick={handleDelete}
      title="Usuń tę opinię"
    >
      <i className="bi bi-trash me-1"></i> Usuń opinię
    </button>
  ) : null;
};

export default DeleteReview;
