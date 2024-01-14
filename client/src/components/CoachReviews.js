import React, { useEffect, useState } from "react";
import DisplayReviews from "./DisplayReview";
import AddReview from "./AddReview";

function CoachReviews({ coach }) {
    const [reviews, setReviews] = useState([])
    
    useEffect(() => {
      const storedReviews = localStorage.getItem("reviews");
      if (storedReviews) {
        setReviews(JSON.parse(storedReviews));
      }
  
    fetch(`/reviews/${coach.id}`).then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            setReviews(data);
          });
        }
      });
    }, []);
  
    useEffect(() => {
      localStorage.setItem("reviews", JSON.stringify(reviews));
    }, [reviews]);

    return (
        <div className="coach-card-container">
          <div className="coach-card">
            <div className="coach-card-header">
              <h1 className="coach-name">{coach.firstname} {coach.lastname}</h1>
            </div>
            <img className="coach-img" src={coach.image} alt="Coach Image" />
            <div className="coach-card-body">
              <p className="coach-sport">Sport: {coach.sport}</p>
              <p className="coach-rate">Rate: ${coach.rate}/hr</p>
            </div>
          </div>
          <div className="review-section">
            <div>
              <AddReview id={coach.id} setReviews={setReviews}/>
            </div>
            <div>
              {reviews.map((review) => (
                <DisplayReviews key={review.id} review={review} />
              ))}
            </div>
          </div>
        </div>
      );
    }
    

export default CoachReviews