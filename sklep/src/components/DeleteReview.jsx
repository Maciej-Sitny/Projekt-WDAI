import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const DeleteReview = ({ userId, productId, isAdmin }) => {
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const decoded = jwtDecode(token);
      setCurrentUserId(decoded.id);
    }
  }, []);

  const handleDelete = async () => {
    try {
      console.log("ID obecnego użytkownika:", currentUserId);
      console.log("ID użytkownika recenzji:", userId);
      console.log("Czy admin:", isAdmin);

      const response = await fetch(
        `http://localhost:5000/api/reviews/${userId}/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify({ isAdmin }),
        }
      );

      if (!response.ok) {
        throw new Error("Nie udało się usunąć recenzji.");
      }

      const data = await response.json();
      console.log("Recenzja usunięta pomyślnie:", data);
      window.location.reload();
    } catch (error) {
      console.error("Błąd podczas usuwania recenzji:", error);
      alert("Nie udało się usunąć recenzji. Spróbuj ponownie.");
    }
  };

  const canDelete = isAdmin || currentUserId === userId;

  return canDelete ? (
    <button
      className="btn btn-danger btn-sm"
      onClick={handleDelete}
      title="Usuń tę opinię"
    >
      <i className="bi bi-trash me-1"></i> Usuń
    </button>
  ) : null;
};

export default DeleteReview;
