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
    <div className="container">
      <div className="row">
        {loading ? (
          <p>Loading...</p>
        ) : (
          reviews.map((review, index) => (
            <div key={index} className="col-md-6 col-lg-4 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <Review {...review} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <AddReview />
    </div>
  );
};

export default Reviews;
