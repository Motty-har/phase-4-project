import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import NavBar from "./NavBar"
import Home from "./Home"
import Coaches from "./Coaches"
import ParentForm from "./ParentForm";
import LogOut from "./LogOut";
import CoachReviews from "./CoachReviews";
import LoadingPage from "./LoadingPage";
import './App.css';

function App() {
  const [ user, setUser ] = useState(null)
  const [ coach, setCoach ] = useState([])
  const [ loading, setLoading ] = useState(true)

  useEffect(() => {
    fetch("/check_session").then((resp) => {
      if (resp.ok) {
        resp.json().then((r) => {
          setUser(r);
        });
      }
      setLoading(false)
    });
  }, []);
  
  return (
    <div className="App">
        
        <div>
        <NavBar className="topnav" user={user}/><br></br>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/coaches">
          <Coaches setUser={setUser} 
          user={user} 
          setCoach={setCoach} 
          />
        </Route>
        <Route path="/logout">
          <LogOut setUser={setUser}/>
        </Route>
        <Route path="/sign_up-log_in">
          <ParentForm setUser={setUser}/>
        </Route>
        <Route path="/coach-review/:id">
        <CoachReviews
          coach={coach}
          setCoach={setCoach}
          user={user}
          setUser={setUser}
          loading={loading}
          setLoading={setLoading}
        />
        </Route>
        </div>
      </div>
  );
}


export default App;
