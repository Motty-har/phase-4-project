import React, {useEffect, useState}from "react";
import CoachCard from "./CoachCard";

function Coaches(){
    const [coaches, setCoaches] = useState([])
    useEffect(() => {
        fetch("/coaches")
          .then((r) => r.json())
          .then((coaches) => {
            setCoaches(coaches)
          });
      }, []);
      return(
        <div>
            {coaches.map((coach) =>{
                return <CoachCard
                    key={coach.id}
                    coach={coach}
                />
            })}
        </div>
      )
      
}

export default Coaches