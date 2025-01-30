import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AddReview = () => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);
  const { id: productId } = useParams();
  const [userId, setUserId] = useState(0);
  const [username, setUsername] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const decoded = jwtDecode(token);
      setUserId(decoded.id);
      setUsername(decoded.email.split("@")[0]);
    }
  }, [productId]);

  const handleEdit = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/reviews/${userId}/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify({ rating, comment }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to edit review.");
      }

      const data = await response.json();
      console.log("Review edited successfully:", data);
      window.location.reload(); // Odśwież stronę po edycji opinii
    } catch (error) {
      console.error("Error editing review:", error);
      setError("Failed to edit review. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment) return;

    try {
      const response = await fetch("http://localhost:5000/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({ userId, productId, rating, comment }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit review.");
      }

      const data = await response.json();
      console.log("Review submitted successfully:", data);
      window.location.reload(); // Odśwież stronę po dodaniu opinii
    } catch (error) {
      console.error("Error submitting review:", error);
      setError("Failed to submit review. Please try again.");
    }
  };

  return (
    <form className="mt-4" onSubmit={handleSubmit}>
      <h4 className="text-primary">Dodaj opinię</h4>
      {editMode && (
        <div className="alert alert-warning" role="alert">
          Jesteś w trybie edycji
        </div>
      )}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <div className="mb-3">
        <label htmlFor="comment" className="form-label fw-bold">
          Komentarz:
        </label>
        <textarea
          id="comment"
          className="form-control"
          rows="4"
          placeholder="Napisz swoją opinię..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="rating" className="form-label fw-bold">
          Ocena:
        </label>
        <div>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`fs-4 me-1 ${
                star <= rating ? "text-warning" : "text-secondary"
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
        </div>
      </div>
      <button type="submit" className="btn btn-primary">
        <i className="bi bi-send me-2"></i>Dodaj opinię
      </button>
      <button
        type="button"
        className="btn btn-secondary ms-2"
        onClick={() => setEditMode(true)}
      >
        Edytuj opinię
      </button>
    </form>
  );
};

export default AddReview;
