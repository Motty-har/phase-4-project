import React, { useEffect, useState } from "react";
import CoachCard from "./CoachCard";

function Coaches({ setUser }) {
  const [coaches, setCoaches] = useState([]);

  useEffect(() => {
    fetch("/coaches")
      .then((r) => {
        if (r.ok) {
          r.json().then((data) => {
            setCoaches(data);
          });
        }
      });
  }, []);

  return (
    <div>
      {coaches.length === 0 ? (
        <h1>You must be logged in to view the coaches</h1>
      ) : (
        coaches.map((coach) => (
          <CoachCard key={coach.id} coach={coach} />
        ))
      )}
    </div>
  );
}

export default Coaches;