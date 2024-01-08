import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";



function SignUp(){


    const formSchema = yup.object().shape({
        username: yup.string().required("Must enter username").min(3).max(20),
        password: yup.string().required("Must enter a password").max(7).max(30)
      });

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch('signup', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values, null, 2),
            })
        }
    })

    return (
        <div>
          <h1>Customer sign up form</h1>
          <form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
            <label htmlFor="username">Username</label>
            <br />
            <input
              id="username"
              name="username"
              onChange={formik.handleChange}
              value={formik.values.username}
            />
            <p style={{ color: "red" }}> {formik.errors.username}</p>
            <label htmlFor="password">Password</label>
            <br />
    
            <input
              id="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <p style={{ color: "red" }}> {formik.errors.password}</p>
    
            <button type="submit">Submit</button>
          </form>
        </div>
      );

}

export default SignUp