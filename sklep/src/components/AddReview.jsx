import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AddReview = () => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);
  const { id: productId } = useParams();
  const [userId, setUserId] = useState(0);
  const [username, setUsername] = useState("");

  const getUserIdFromToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded.id;
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  };

  const getUsernameFromToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded.email.split("@")[0]; // Assuming username is part of the email
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("authToken");
      const userId = getUserIdFromToken(token);
      const username = getUsernameFromToken(token);
      setUserId(userId);
      setUsername(username);
    };

    fetchUserData();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment) {
      const response = await fetch("http://localhost:5000/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({
          userId,
          username,
          rating,
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
