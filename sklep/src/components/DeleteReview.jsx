import React from "react";

const DeleteReview = ({ userId, productId }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/reviews/${userId}/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
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
      setError("Failed to delete review. Please try again.");
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
