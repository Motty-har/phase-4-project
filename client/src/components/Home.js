import React, {Route} from "react";
import SignUp from "./SignUp";

function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Coached!</h1>
      <p className="home-description">Find the perfect sports coach to train with and achieve your goals.</p>
      <p className="home-paragraph">Coached is a platform where you can browse through a wide range of sports coaches, read reviews from other athletes, and make informed decisions to find the right coach for you.</p>
      <p className="home-paragraph">Whether you're a beginner looking to learn a new sport or an experienced athlete aiming to improve your skills, Coached is here to help you connect with top-notch coaches.</p>
      <button className="get-started-button">Get Started</button>
    </div>
  );
}

export default Home;