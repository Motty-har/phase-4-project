import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DisplayReviews from "./DisplayReview";
import AddReview from "./AddReview";
import LoadingPage from "./LoadingPage";  
import UserReview from "./UserReview";
import "./CoachCard.css";

function CoachReviews({ coach, setCoach, user, setUser }) {
  const { id: coachId } = useParams();
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  
  useEffect(() => {
    fetch(`/coach/${coachId}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch coach data");
        }
      })
      .then((data) => {
        setReviews(data.reviews);
        setCoach(data);
        setLoading(false);  
      })
      .catch((error) => {
        console.error("Error fetching coach data:", error);
      });
  }, []);

  function onAdd(coach) {
    setReviews(coach.reviews);
  }
  
  function onDelete(reviewId) {
    fetch(`/delete_review/${reviewId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          setReviews(reviews.filter(r => r.id !== reviewId));
        } else {
          throw new Error("Failed to delete review");
        }
      })
      .catch((error) => {
        console.error("Error deleting review:", error);
      });
  }

  function onEdit(review) {
    const newReviews = reviews.map(r => (r.id === review.id ? review : r));
    setReviews(newReviews);
  }

  return (
    <div>
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="coach-reviews-container">
          <div className="card-container">
            <div className="image-container">
              <img src={coach.image} className="coach-img" alt="" />
            </div>
            <h1 className="name">
              {coach.first_name} {coach.last_name}
            </h1>
            <p className="sport">Sport: {coach.sport}</p>
            <p className="rate">Rate: ${coach.rate} Per Session</p>
            <br></br>
            <h3>Contact Information</h3>
            <p>
              <strong>Phone Number:</strong> {coach.number}
            </p>
            <p>
              <strong>Email:</strong> {coach.email}
            </p>
          </div>

          <div className="review-list">
            {reviews && reviews.length === 0 ? (
              <div className="card">
                <h2>No Reviews Yet</h2>
              </div>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="review-card">
                  {user.id === review.user.id ? (
                    <UserReview key={review.id} review={review} onDelete={onDelete} onEdit={onEdit}/>
                  ) : (
                    <DisplayReviews key={review.id} review={review} />
                  )}
                </div>
              ))
            )}
          </div>

          <div className="add-review-container">
            {user && <AddReview id={coach.id} user={user} onAdd={onAdd} coachId={coachId}/>}
          </div>
        </div>
      )}
    </div>
  );
}

export default CoachReviews;
