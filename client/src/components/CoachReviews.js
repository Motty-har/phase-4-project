import React, { useEffect, useState } from "react";
import DisplayReviews from "./DisplayReview";
import AddReview from "./AddReview";
import "./CoachCard.css"


function CoachReviews({ coach, user }) {
  const [reviews, setReviews] = useState([]);

  console.log(coach.id)
  useEffect(() => {
    fetch(`/reviews/${coach.id}`).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setReviews(data);
        });
      }
    });
  }, []);

  return (
    <div className="coach-reviews-container"/*in App.css*/>
      <div>
      <div className="card-container">
        <div className="image-container">
          <img src={coach.image} className="coach-img" alt="" />
        </div>
        <h1 className="name">{coach.first_name} {coach.last_name}</h1>
        <p className="sport">Sport: {coach.sport}</p>
        <p className="rate">Rate: ${coach.rate} Per Session</p>
      </div>
    </div>
      <div className="review-list" /*in App.css*/>
        {reviews.map((review) => (
          <div key={review.id} className="review-card" /*in App.css*/>
            <DisplayReviews review={review} />
          </div>
        ))}
      </div>
      <div className="add-review-container">
        <AddReview id={coach.id} setReviews={setReviews} user={user} />
      </div>
    </div>
  );
}

export default CoachReviews;