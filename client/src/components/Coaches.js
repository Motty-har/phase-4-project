import React, { useEffect, useState } from "react";
import CoachCard from "./CoachCard";

function Coaches({ setUser, setCoach, user, loading }) {
  const [coaches, setCoaches] = useState(null);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          const response = await fetch("/coaches");

          if (response.ok) {
            const data = await response.json();
            setCoaches(data);
          } else {
            setCoaches([]);
          }
        } catch (error) {
          console.error("Error fetching coaches:", error);
          setCoaches([]);
        }
      };

      fetchData();
    }
  }, [user]);

  return (
    <div className="coach-card-display-container">
      {user ? (
        coaches === null ? (
          <h1 className="title">Loading coaches...</h1>
        ) : coaches.length === 0 ? (
          <h1 className="title">No coaches available</h1>
        ) : (
          coaches.map((coach) => (
            <CoachCard key={coach.id} coach={coach} setCoach={setCoach} />
          ))
        )
      ) : !loading && (
        <h1 className="title">You must be logged in to view coaches...</h1>
      )}
    </div>
  );
}

export default Coaches;
