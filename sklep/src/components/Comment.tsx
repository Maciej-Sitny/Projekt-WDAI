import React, { useState } from "react";

interface User {
  id: number;
  username: string;
  fullName: string;
}

interface KomentarzProps {
  id: number;
  body: string;
  postId: number;
  likes: number;
  user: User;
}

const Komentarz: React.FC<KomentarzProps> = ({
  id,
  body,
  postId,
  likes: initialLikes,
  user,
}) => {
  const [updatedLikes, setLikes] = useState(initialLikes);
  const [userAction, setUserAction] = useState<"liked" | "disliked" | null>(
    null
  );

  const handleLikes = () => {
    if (userAction === "liked") {
      setLikes(updatedLikes - 1);
      setUserAction(null);
    } else if (userAction === "disliked") {
      setLikes(updatedLikes + 2);
      setUserAction("liked");
    } else {
      setLikes(updatedLikes + 1);
      setUserAction("liked");
    }
  };

  const handleDislikes = () => {
    if (userAction === "disliked") {
      setLikes(updatedLikes + 1);
      setUserAction(null);
    } else if (userAction === "liked") {
      setLikes(updatedLikes - 2);
      setUserAction("disliked");
    } else {
      setLikes(updatedLikes - 1);
      setUserAction("disliked");
    }
  };

  return (
    <div className="card mb-3" key={id}>
      <div className="card-header">
        <span className="fw-bold">{user.username}</span> -{" "}
        <span className="text-muted">{user.fullName}</span>
      </div>
      <div className="card-body">
        <p>{body}</p>
      </div>
      <div className="card-footer d-flex justify-content-between align-items-center">
        <div>
          <button
            className={`btn btn-sm ${
              userAction === "liked" ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={handleLikes}
          >
            Like
          </button>
          <button
            className={`btn btn-sm ${
              userAction === "disliked" ? "btn-danger" : "btn-outline-danger"
            }`}
            onClick={handleDislikes}
          >
            Dislike
          </button>
        </div>
        <div>
          <span className="me-2">Likes: {updatedLikes}</span>
          <span className="text-muted">Post ID: {postId}</span>
        </div>
      </div>
    </div>
  );
};

export default Komentarz;
