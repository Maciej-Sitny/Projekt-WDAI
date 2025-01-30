import React from "react";
import DeleteReview from "./DeleteReview";

const Review = ({
  userId,
  productId,
  username,
  rating,
  comment,
  createdAt,
  isAdmin,
}) => {
  const formattedDate = new Date(createdAt).toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      className="card mb-4 shadow-sm border-0 rounded-4"
      style={{ maxWidth: "500px", margin: "0 auto" }}
    >
      <div className="card-header bg-warning text-dark d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center rounded-top gap-2">
        <div className="d-flex align-items-center">
          <i className="bi bi-person-circle fs-4 me-2"></i>
          <h5 className="mb-0 me-3">{username}</h5>
        </div>
        <div className="d-flex align-items-center gap-3">
          <span className="badge bg-dark text-warning fs-6 px-3 py-2">
            <i className="bi bi-star-fill me-1"></i>
            {rating}/5
          </span>
          <DeleteReview
            userId={userId}
            productId={productId}
            isAdmin={isAdmin}
          />
        </div>
      </div>

      <div className="card-body bg-light rounded-bottom">
        <p className="fw-bold mb-2">Ocena produktu: {rating}/5</p>
        <p className="text-dark">{comment}</p>
      </div>

      <div className="card-footer bg-light text-end rounded-bottom border-top">
        <small className="text-muted">
          <i className="bi bi-calendar-event me-1"></i>
          {formattedDate}
        </small>
      </div>
    </div>
  );
};

export default Review;
