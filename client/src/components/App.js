import React, { useEffect, useState } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import NavBar from "./NavBar"
import Home from "./Home"
import Coaches from "./Coaches"
import ParentForm from "./ParentForm";
import './App.css';

function App() {
  return (
    <div className="App">
        <NavBar className="topnav"/><br></br>
        <Route exact path="/">
          <Home />
        </Route><br></br>
        <Route path="/coaches">
          <Coaches />
        </Route>
        <Route path="/sign_up">
          <ParentForm />
        </Route>
      </div>
  );
}


export default App;
