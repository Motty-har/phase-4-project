import React, { useEffect, useState } from "react";
import DisplayReviews from "./DisplayReview";
import AddReview from "./AddReview";

function CoachReviews({ id, firstname, lastname, image, sport, rate }) {
    const [reviews, setReviews] = useState([])
    useEffect(() => {
            fetch(`reviews/${id}`)
            .then(r => {
                if (r.ok){
                    r.json().then(r => setReviews(r))
                }
            })
    }, [id])
    return (
        <div className="coach-card-container">
          <div className="coach-card">
            <div className="coach-card-header">
              <h1 className="coach-name">{firstname} {lastname}</h1>
            </div>
            <img className="coach-img" src={image} alt="Coach Image" />
            <div className="coach-card-body">
              <p className="coach-sport">Sport: {sport}</p>
              <p className="coach-rate">Rate: ${rate}/hr</p>
            </div>
          </div>
          <div className="review-section">
            <div>
              <AddReview id={id}/>
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