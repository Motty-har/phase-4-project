import React, {useEffect, useState}from "react";
import CoachCard from "./CoachCard";

function Coaches({ setUser, setCoach}){
    const [coaches, setCoaches] = useState(false)
    useEffect(() => {
      fetch("/check_session")
      .then(resp => {
        if(resp.ok){
          resp.json().then(r => {
            setUser(r)
          })
        }
      })
    }, [])
    useEffect(() => {
        fetch("/coaches")
          .then((r) => {
            if (r.ok){
              r.json().then(r => {
               setCoaches(r)
              })
            setCoaches(false)
            }
          });
      }, []);
      return(
        <div className="coach-card-display-container" /*in App.css*/>
            {coaches === false ? <h1 className="title">You must be logged in to view the coaches</h1>:
            coaches.map((coach) =>{
                return <CoachCard
                  key={coach.id}
                  coach={coach}
                  setCoach={setCoach}
                />
            })}
        </div>
      )
      
}

export default Coaches