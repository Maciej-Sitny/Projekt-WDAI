import React, { useEffect, useState } from "react";
import Review from "./Review";
import AddReview from "./AddReview";
import { useParams } from "react-router-dom";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const productId = useParams();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `http://localhost:4002/api/reviews/${productId.id}`
        );
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Błąd podczas pobierania opinii:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [productId]);

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Ładowanie...</span>
        </div>
        <p className="mt-3">Ładowanie opinii...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="display-6 text-primary text-center">Opinie</h2>
      <div className="row mt-4">
        {reviews.length === 0 ? (
          <p className="text-muted text-center">Brak opinii</p>
        ) : (
          reviews.map((review, index) => (
            <div key={index} className="col-md-6 col-lg-4 mb-4">
              <Review
                firstName={review.firstName}
                lastName={review.lastName}
                rating={review.rating}
                comment={review.comment}
                date={review.date}
              />
            </div>
          ))
        )}
      </div>
      <AddReview />
    </div>
  );
};

export default Reviews;
