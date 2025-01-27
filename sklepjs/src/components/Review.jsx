import React from "react";

const Review = ({ rating, comment, date, firstName, lastName }) => {
  return (
    <div className="card mb-4 shadow-sm border-0">
      {/* Nagłówek z nazwiskiem użytkownika */}
      <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <h5 className="mb-0">
          <i className="bi bi-person-circle me-2"></i>
          {firstName} {lastName}
        </h5>
        <span className="badge bg-warning text-dark">
          <i className="bi bi-star-fill me-1"></i>
          {rating}/5
        </span>
      </div>
      {/* Treść recenzji */}
      <div className="card-body">
        <blockquote className="blockquote mb-0">
          <p className="fst-italic text-muted">
            <i className="bi bi-chat-left-quote me-2"></i>
            {comment}
          </p>
        </blockquote>
      </div>{" "}
    </div>
  );
};

export default Review;
