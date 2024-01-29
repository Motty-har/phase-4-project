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

  useEffect(() => {
    fetch("/check_session").then((resp) => {
      if (resp.ok) {
        resp.json().then((r) => {
          setUser(r);
        });
      }
    });
  }, []);

  useEffect(() => {
    fetch(`/coach/${coachId}`).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setCoach(data);
          setLoading(false);  
        });
      }
    });
  }, []);

  return (
    <div>
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="coach-reviews-container" /*in App.css*/>
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

          <div className="review-list" /*in App.css*/>
            {coach.reviews && coach.reviews.length === 0 ? (
              <div className="card">
                <h2>No Reviews Yet</h2>
              </div>
            ) : (
              coach.reviews.map((review) => (
                <div key={review.id} className="review-card">
                  {user.id === review.user.id ? (
                    <UserReview key={review.id} review={review} />
                  ) : (
                    <DisplayReviews key={review.id} review={review} />
                  )}
                </div>
              ))
            )}
          </div>

          <div className="add-review-container">
            {user && <AddReview id={coach.id} user={user} />}
          </div>
        </div>
      )}
    </div>
  );
}

export default CoachReviews;
