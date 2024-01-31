import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  review: yup.string().required("Must enter a review").min(10).max(500),
});

function AddReview({ id, user, onAdd }) {
  const formik = useFormik({
    initialValues: {
      review: "",
      coach_id: id,
      user_id: user.id,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      fetch("/add_review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      })
        .then((r) => r.json())
        .then((r) => onAdd(r));
      formik.resetForm();
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
