import React from "react";

const DeleteReview = ({ userId, productId }) => {
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("authToken"); // Assuming the token is stored in localStorage
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
        window.location.reload();
      } else {
        console.error("Error deleting review:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return <button onClick={handleDelete}>Delete Review</button>;
};

export default DeleteReview;
