import React from "react";

function CoachCard({coach}){
    return(
        <div className="card">
            <h1 className="name">{coach.first_name} {coach.last_name}</h1>
            <img src={coach.image} className="coach-img" alt=""/>
            <p className="sport">Sport: {coach.sport}</p>
            <p className="rate">Rate: ${coach.rate} Per Session</p>
        </div>
    )
}

export default CoachCard