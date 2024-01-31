import React, { useState } from "react";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import './Form.css'

function ParentForm({ setUser }) {
  const [logIn, setLogIn] = useState(false);

  return logIn ? (
    <LogIn logIn={logIn} setLogIn={setLogIn} setUser={setUser} />
  ) : (
    <SignUp logIn={logIn} setLogIn={setLogIn} setUser={setUser} />
  );
}

export default ParentForm;
