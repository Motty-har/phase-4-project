import React from "react";
import { NavLink } from "react-router-dom";

function NavBar({ user }) {
  return (
    <div className="topnav">
      <div className="left-links">
        <NavLink exact to="/" className="nav-link" activeClassName="active-link">
          Home
        </NavLink>
        <NavLink to="/coaches" className="nav-link" activeClassName="active-link">
          Coaches
        </NavLink>
      </div>
      <div className="right-links">
        {user === null ? <NavLink to="/sign_up-log_in" className="nav-link" activeClassName="active-link">
          Sign Up/Log In
        </NavLink>:
        <NavLink to="/logout" className="nav-link" activeClassName="active-link">
          logout
        </NavLink>}
      </div>
    </div>
  );
}

export default NavBar;