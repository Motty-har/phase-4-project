import React from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

function LogIn({ logIn, setLogIn }) {
    
    const history = useHistory()

    function handleClick(){
        setLogIn(!logIn)
    }
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      fetch("login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      });
      history.push('/coaches')
    },
  });

  return (
    <div className="card">
      <div className="card-header">
        <h1 className="form-name">Log In</h1>
      </div>
      <div className="card-body">
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="username">Username</label>
          <br />
          <input
            id="username"
            name="username"
            onChange={formik.handleChange}
            value={formik.values.username}
          />
          <label htmlFor="password">Password</label>
          <br />
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <button type="submit" className="get-started-button">
            Submit
          </button>
          <p>Don't have an account yet?</p>
          <button type="click" onClick={handleClick}>Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default LogIn;