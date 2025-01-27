import React from "react";

const DeleteReview = ({ userId, productId }) => {
  const handleDelete = async () => {
    if (!window.confirm("Czy na pewno chcesz usunąć tę opinię?")) {
      return; // Abort if the user cancels the confirmation dialog
    }

    try {
      const token = localStorage.getItem("authToken"); // Retrieve token from localStorage
      const response = await fetch(
        `http://localhost:5000/api/reviews/${userId}/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        alert("Opinia została usunięta pomyślnie.");
        window.location.reload(); // Reload page to update reviews
      } else {
        console.error("Błąd podczas usuwania opinii:", response.statusText);
        alert("Wystąpił problem podczas usuwania opinii. Spróbuj ponownie.");
      }
    } catch (error) {
      console.error("Błąd podczas usuwania opinii:", error);
      alert("Wystąpił błąd. Spróbuj ponownie później.");
    }
  };

  return (
    <button
      className="btn btn-danger btn-sm"
      onClick={handleDelete}
      title="Usuń tę opinię"
    >
      <i className="bi bi-trash me-1"></i> Usuń opinię
    </button>
  );
};

export default DeleteReview;
