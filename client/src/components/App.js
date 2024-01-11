import React, { useEffect, useState } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import NavBar from "./NavBar"
import Home from "./Home"
import Coaches from "./Coaches"
import ParentForm from "./ParentForm";
import LogOut from "./LogOut";
import './App.css';

function App() {
  const [ user, setUser ] = useState(null)
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
  console.log(user)
  return (
    <div className="App">
        <NavBar className="topnav"/><br></br>
        <Route exact path="/">
          <Home />
        </Route><br></br>
        <Route path="/coaches">
          <Coaches />
        </Route>
        <Route path="/logout">
          <LogOut />
        </Route>
        <Route path="/sign_up-log_in">
          <ParentForm />
        </Route>
      </div>
  );
}


export default App;
