import React, { useEffect, useState } from "react";
import CoachCard from "./CoachCard";
import LoadingPage from "./LoadingPage";

function Coaches({ setUser, setCoach }) {
  const [coaches, setCoaches] = useState(null); 

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
    fetch("/coaches")
      .then((r) => {
        if (r.ok) {
          r.json().then((data) => {
            setCoaches(data); 
          });
        } else {
          setCoaches([]);
        }
      });
  }, []);

  return (
        <div className="coach-card-display-container" >
          {coaches === null ? (
            <h1 className="title">Loading coaches...</h1>
          ) : coaches.length === 0 ? (
            <h1 className="title">No coaches available</h1>
          ) : (
            coaches.map((coach) => (
              <CoachCard key={coach.id} coach={coach} setCoach={setCoach} />
            ))
          )}
        </div>
    
  );
}

export default Coaches;
