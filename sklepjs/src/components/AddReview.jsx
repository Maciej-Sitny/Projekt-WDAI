import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const AddReview = () => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);
  const { id: productId } = useParams();
  const [userId, setUserId] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    const fetchUserId = async () => {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        console.error("No auth token found");
        return;
      }

      const response = await fetch("http://localhost:3001/api/users/me", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        console.error("Failed to fetch user details");
        return;
      }

      const data = await response.json();

      setUserId(data.id);
      setFirstName(data.firstName);
      setLastName(data.lastName);
    };

    fetchUserId();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment) {
      const response = await fetch("http://localhost:4002/api/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          rating,
          userId,
          comment,
          productId,
        }),
      });

      if (!response.ok) {
        console.error("Failed to submit review");
        return;
      }

      const data = await response.json();
      console.log("Review submitted successfully:", data);
      window.location.reload();
    }
  };

  return (
    <form className="mt-4" onSubmit={handleSubmit}>
      <h4 className="text-primary">Dodaj opinię</h4>

      {/* Pole komentarza */}
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

      {/* Wybór oceny */}
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

      {/* Przycisk wysyłania */}
      <button type="submit" className="btn btn-primary">
        <i className="bi bi-send me-2"></i>Dodaj opinię
      </button>
    </form>
  );
};

export default AddReview;
