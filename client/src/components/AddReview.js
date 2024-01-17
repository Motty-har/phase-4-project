import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom";

function AddReview({ id, user }) {
  const history = useHistory();

  const formSchema = yup.object().shape({
    review: yup.string().required("Must enter a review").min(10).max(500),
  });

  const formik = useFormik({
    initialValues: {
      coach_id: id,
      user_id: user.id,
      review: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch("/add_review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      });
      formik.resetForm();
      history.push("/coach-review");
    },
  });

  useEffect(() => {
    formik.setValues((prevValues) => ({
      ...prevValues,
      user_id: user.id,
    }));
  }, [user.id]);

  return (
    <div className="card">
      <div className="card-header">
        <h1 className="form-name">Add a Review</h1>
      </div>
      <div className="card-body">
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label htmlFor="review">Review</label>
            <br />
            <textarea
              id="review"
              name="review"
              className={`form-control ${
                formik.errors.review ? "error-input" : ""
              }`}
              onChange={formik.handleChange}
              value={formik.values.review}
              rows={5}
              style={{ resize: "none", width: "100%" }}
            />
            {formik.errors.review && (
              <p style={{ color: "red" }}>{formik.errors.review}</p>
            )}
          </div>
          <button type="submit" className="get-started-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddReview;
