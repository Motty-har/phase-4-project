import React, { useEffect, useState } from "react";
import CoachCard from "./CoachCard";

function Coaches({ setUser, setCoach, user }) {
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
    if (user) {
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
    }
  }, [user]);

  return (
    <div className="coach-card-display-container">
      {user === null ? (
        <h1 className="title">You must be logged in to view coaches...</h1>
      ) : user ? (
        coaches === null ? (
          <h1 className="title">Loading coaches...</h1>
        ) : coaches.length === 0 ? (
          <h1 className="title">No coaches available</h1>
        ) : (
          coaches.map((coach) => (
            <CoachCard key={coach.id} coach={coach} setCoach={setCoach} />
          ))
        )
      ) : (
        <h1 className="title">You need to be logged in to view coaches.</h1>
      )}
    </div>
  );
}

export default Coaches;
