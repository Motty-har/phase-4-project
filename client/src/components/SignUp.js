import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom";

function SignUp({ logIn, setLogIn, setUser }) {
  const history = useHistory()

  function handleClick(){
      setLogIn(!logIn)
  }
  const formSchema = yup.object().shape({
    username: yup.string().required("Must enter username").min(3).max(20),
    password: yup.string().required("Must enter a password").min(7).max(30),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch("signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      }).then(r => r.json())
      .then(r => {setUser(r)
        history.push('/coaches')
      });
    },
  });

  return (
    <div className="card">
      <div className="card-header">
        <h1 className="form-name">Sign Up</h1>
      </div>
      <div className="card-body">
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="username">Username</label>
          <br />
          <input
            id="username"
            name="username"
            className={formik.errors.username ? "error-input" : ""}
            onChange={formik.handleChange}
            value={formik.values.username}
          />
          {formik.errors.username && (
            <p style={{ color: "red" }}>{formik.errors.username}</p>
          )}
          <label htmlFor="password">Password</label>
          <br />
          <input
            id="password"
            name="password"
            type="password"
            className={formik.errors.password ? "error-input" : ""}
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password && (
            <p style={{ color: "red" }}>{formik.errors.password}</p>
          )}
          <button type="submit" className="get-started-button">
            Submit
          </button>
          <p>Have an account already?</p>
          <button type="click" onClick={handleClick}>Log In</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;