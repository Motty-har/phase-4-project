import React from "react";
import { useHistory } from "react-router-dom";
import './CoachCard.css';

function CoachCard({ coach, setCoach }) {
  const history = useHistory();

  const { id, image, first_name, last_name, sport, rate } = coach;

  const handleClick = () => {
    setCoach(coach);
    history.push(`/coach-review/${id}`);
  };

  return (
    <div>
      <div className="card" onClick={handleClick}>
        <div className="image-container">
          <img src={image} className="coach-img" alt="" />
        </div>
        <h1 className="name">{`${first_name} ${last_name}`}</h1>
        <p className="sport">Sport: {sport}</p>
        <p className="rate">Rate: ${rate} Per Session</p>
      </div>
    </div>
  );
}

export default CoachCard;
