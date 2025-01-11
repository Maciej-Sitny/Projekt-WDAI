import React, { useEffect, useState } from "react";
import Review from "./Review";

const Reviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `https://dummyjson.com/products/${productId}`
        );
        const data = await response.json();
        setReviews(data.reviews);
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
              <div className="card shadow-sm">
                <div className="card-body">
                  <Review key={index} {...review} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Reviews;
