import React, { useEffect, useState } from "react";
import DisplayReviews from "./DisplayReview";
import AddReview from "./AddReview";
import "./CoachCard.css"


function CoachReviews({ coach, setCoach, user, setUser }) {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetch('/get_coach')
      .then(r => r.json())
      .then(r => setCoach(r));
    fetch("/check_session").then((resp) => {
      if (resp.ok) {
        resp.json().then((r) => {
          setUser(r);
        });
      }
    });
  }, []);
  
  useEffect(() => {
    console.log(coach.id)
      fetch(`/reviews/${coach.id}`).then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            setReviews(data);
          });
        }
      });
  }, [setCoach]);

  return (
    <div className="coach-reviews-container"/*in App.css*/>
      <div>
      <div className="card-container">
        <div className="image-container">
          <img src={coach.image} className="coach-img" alt="" />
        </div>
        <h1 className="name">{coach.first_name} {coach.last_name}</h1>
        <p className="sport">Sport: {coach.sport}</p>
        <p className="rate">Rate: ${coach.rate} Per Session</p><br></br>
        <h3>Contact Information</h3>
        <p><strong>Phone Number:</strong> {coach.number}</p>
        <p><strong>Email:</strong> {coach.email}</p>
      </div>
    </div>
      
      <div className="review-list" /*in App.css*/>
      {reviews.length === 0 ? (
          <div className="card">
          <h2>No Reviews Yet</h2>
          </div>
      ) : (
      reviews.map((review) => (
        <div key={review.id} className="review-card">
          <DisplayReviews review={review} />
        </div>
  ))
)}
      </div>
      <div className="add-review-container">
        {user && <AddReview id={coach.id} setReviews={setReviews} user={user} />}
      </div>
    </div>
  );
}

export default CoachReviews;