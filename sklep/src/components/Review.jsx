import React from "react";
import DeleteReview from "./DeleteReview";

const Review = ({
  userId,
  productId,
  username,
  rating,
  comment,
  createdAt,
}) => {
  const formattedDate = new Date(createdAt).toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="card mb-4 shadow-sm border-0 rounded-4">
      {/* Nagłówek */}
      <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center rounded-top">
        <div className="d-flex align-items-center">
          <i className="bi bi-person-circle fs-4 me-2"></i>
          <h5 className="mb-0">{username}</h5>
        </div>
        <div className="d-flex align-items-center">
          <span className="badge bg-warning text-dark fs-6 px-3 py-2 me-2">
            <i className="bi bi-star-fill me-1"></i>
            {rating}/5
          </span>
          <DeleteReview userId={userId} productId={productId} />
        </div>
      </div>

      {/* Treść recenzji */}
      <div className="card-body">
        <p className="fw-bold mb-2">Ocena produktu: {rating}/5</p>
        <p className="text-secondary">{comment}</p>
      </div>

      {/* Stopka */}
      <div className="card-footer bg-light text-end rounded-bottom">
        <small className="text-muted">
          <i className="bi bi-calendar-event me-1"></i>
          {formattedDate}
        </small>
      </div>
    </div>
  );
};

export default Review;
