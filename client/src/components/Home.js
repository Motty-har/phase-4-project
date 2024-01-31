import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import './Home.css'

function Home() {
  const [user, setUser] = useState(false)
  
  useEffect(() => {
    fetch("/check_session")
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Failed to check session");
        }
      })
      .then(data => {
        setUser(data);
      })
      .catch(error => {
        console.error("Error checking session:", error);
        setUser(false)
      });
  }, []);
  console.log(user)
  const history = useHistory()
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Coached!</h1>
      <p className="home-description">Find the perfect sports coach to train with and achieve your goals.</p>
      <p className="home-paragraph">Coached is a platform where you can browse through a wide range of sports coaches, read reviews from other athletes, and make informed decisions to find the right coach for you.</p>
      <p className="home-paragraph">Whether you're a beginner looking to learn a new sport or an experienced athlete aiming to improve your skills, Coached is here to help you connect with top-notch coaches.</p>
      {user !== null && (
  <button
    className="get-started-button"
    onClick={() =>
      !user ? history.push('/sign_up-log_in') : history.push('/coaches')
    }
  >
    Get Started
  </button>
)}
    </div>
  );
}

export default Home;