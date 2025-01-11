import React from "react";

const Review = ({ rating, comment, date, reviewerEmail, reviewerName }) => {
  return (
    <div className={`card mb-3 shadow-sm`}>
      <div className="card-header bg-primary text-white">
        <span className="fw-bold">{reviewerName}</span>{" "}
        <span className="text-light">({reviewerEmail})</span>
      </div>
      <div className="card-body">
        <p>
          <strong>Ocena produktu:</strong> {rating}/5
        </p>
        <p>{comment}</p>
      </div>
      <div className="card-footer bg-light">
        <small className="text-muted">
          Data: {new Date(date).toLocaleString()}
        </small>
      </div>
    </div>
  );
};

export default Review;
