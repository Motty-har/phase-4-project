import React from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";

function LogIn({ logIn, setLogIn, setUser }) {
  const history = useHistory();

  function handleClick() {
    setLogIn(!logIn);
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
      }).then((r) => {
        if (r.ok) {
          r.json().then((r) => {
            setUser(r);
          });
          history.push('/coaches');
        }
      });
    },
  });

  return (
    <div className="parent-container">
      <div className="form-card">
        <h1 className="form-name">Log In</h1>
        <div className="card-body">
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              onChange={formik.handleChange}
              value={formik.values.username}
            /><br></br><br></br>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <div className="submit-button-wrapper">
              <button className="submit-button">Submit</button>
            </div><br></br>
            <div className="btn-wrapper">
              <p className="message">Don't have an account yet?</p>
              <button className="signup-btn" type="click" onClick={handleClick}>Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
