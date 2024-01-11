import React from "react";
import { useHistory } from "react-router-dom";

function CoachCard({ coach, setCoach }){
    const history = useHistory()
    return(
        <div className="card" onClick={() => {
            setCoach(coach)
            history.push('/coach-review')
            
        }}>
            <h1 className="name">{coach.first_name} {coach.last_name}</h1>
            <img src={coach.image} className="coach-img" alt=""/>
            <p className="sport">Sport: {coach.sport}</p>
            <p className="rate">Rate: ${coach.rate} Per Session</p>
        </div>
    )
}

export default CoachCard