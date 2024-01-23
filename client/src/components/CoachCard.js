import React from "react";
import { useHistory } from "react-router-dom";
import './CoachCard.css';

function CoachCard({ coach, setCoach }) {
  const history = useHistory(); 

  function handleClick() {
    fetch('/set_coach', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        coach_id: coach.id,
      }),
    })
    setCoach(coach);
    localStorage.setItem("coach", JSON.stringify(coach));
    history.push('/coach-review')
  }

  return (
    <div>
      <div className="card" onClick={handleClick}>
        <div className="image-container">
          <img src={coach.image} className="coach-img" alt="" />
        </div>
        <h1 className="name">{coach.first_name} {coach.last_name}</h1>
        <p className="sport">Sport: {coach.sport}</p>
        <p className="rate">Rate: ${coach.rate} Per Session</p>
      </div>
    </div>
  );
}

export default CoachCard;