import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
    return(
        <div className="topnav">
          <NavLink
              exact to="/"
              activeStyle={{
                background: "maroon",
              }}>
            Home
          </NavLink>
          <NavLink
              to="/coaches"
              activeStyle={{
                background: "maroon",
              }}>
            Coaches
          </NavLink>
          <NavLink
              to="/sign_up"
              activeStyle={{
                background: "maroon",
              }}>
            Sign Up
          </NavLink>
        </div>
      )
  }

export default NavBar;