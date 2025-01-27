import React from "react";

const Review = ({ username, rating, comment, createdAt }) => {
  const formattedDate = new Date(createdAt).toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="card mb-4 shadow-sm border-0">
      {/* Nagłówek z nazwą użytkownika i oceną */}
      <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center rounded-top">
        <h5 className="mb-0 d-flex align-items-center">
          <i className="bi bi-person-circle me-2"></i>
          {username}
        </h5>
        <div className="d-flex align-items-center">
          <span className="badge bg-warning text-dark p-2 me-2">
            <i className="bi bi-star-fill me-1"></i>
            {rating}/5
          </span>
          <button className="btn btn-sm btn-light">
            <i className="bi bi-pencil-square"></i> Edit Review
          </button>
        </div>
      </div>
      {/* Treść recenzji */}
      <div className="card-body">
        <p className="mb-2">
          <strong>Ocena produktu:</strong> {rating}/5
        </p>
        <p className="text-muted">{comment}</p>
      </div>
      {/* Stopka z datą */}
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
