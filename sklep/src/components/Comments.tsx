import React, { useEffect, useState } from "react";
import Comment from "./Comment";

interface User {
  id: number;
  username: string;
  fullName: string;
}

interface Comment {
  id: number;
  body: string;
  postId: number;
  likes: number;
  user: User;
}

const Komentarze: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("https://dummyjson.com/comments")
      .then((response) => response.json())
      .then((data) => {
        setComments(data.comments);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Błąd podczas pobierania danych:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Ładowanie...</span>
        </div>
        <p className="mt-3">Ładowanie komentarzy...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="display-6 text-primary">Komentarze</h2>
      {comments.length === 0 ? (
        <p>Brak komentarzy</p>
      ) : (
        comments.map((comment) => (
          <div key={comment.id} className="mb-3">
            <Comment
              id={comment.id}
              body={comment.body}
              postId={comment.postId}
              likes={comment.likes}
              user={comment.user}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default Komentarze;
