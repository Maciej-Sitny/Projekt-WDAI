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

      const checkExistingReview = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/api/reviews/${decoded.id}/${productId}`
          );
          if (response.ok) {
            const data = await response.json();
            if (data) {
              setEditMode(true);
              setComment(data.comment);
              setRating(data.rating);
            }
          }
        } catch (error) {
          console.error("Błąd podczas sprawdzania istniejącej opinii:", error);
        }
      };

      checkExistingReview();
    }
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment) return;

    try {
      const url = editMode
        ? `http://localhost:5000/api/reviews/${userId}/${productId}`
        : "http://localhost:5000/api/reviews";
      const method = editMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({ userId, productId, username, rating, comment }),
      });

      if (!response.ok) {
        throw new Error("Nie udało się przesłać opinii.");
      }

      window.location.reload();
    } catch (error) {
      console.error("Błąd podczas przesyłania opinii:", error);
      setError("Nie udało się przesłać opinii. Spróbuj ponownie.");
    }
  };

  return (
    <form
      className="mt-4 p-4 bg-light border rounded-4 shadow-sm"
      onSubmit={handleSubmit}
    >
      <h4 className="text-warning fw-bold mb-3">
        {editMode ? "Edytuj opinię" : "Dodaj opinię"}
      </h4>
      {editMode && (
        <div className="alert alert-warning" role="alert">
          Tryb edycji – możesz zmienić swoją opinię.
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
      <button type="submit" className="btn btn-warning w-100">
        <i className="bi bi-send me-2"></i>
        {editMode ? "Zapisz zmiany" : "Dodaj opinię"}
      </button>
    </form>
  );
};

export default AddReview;
