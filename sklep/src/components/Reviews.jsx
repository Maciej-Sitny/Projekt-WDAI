import React, { useEffect, useState } from "react";
import Review from "./Review";
import AddReview from "./AddReview";
import { useParams } from "react-router-dom";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id: productId } = useParams();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/reviews/${productId}`
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

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Opinie o produkcie</h2>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Ładowanie...</span>
          </div>
        </div>
      ) : reviews.length > 0 ? (
        <div className="row g-4">
          {reviews.map((review, index) => (
            <div key={index} className="col-md-6 col-lg-4">
              <Review {...review} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted">Brak opinii dla tego produktu.</p>
      )}

      <div className="mt-5">
        <div className="d-flex justify-content-center">
          <AddReview />
        </div>
      </div>
    </div>
  );
};

export default Reviews;
