import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

function UserReview({ review, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);

  const formSchema = yup.object().shape({
    review: yup.string().required("Must enter a review").min(10).max(500),
  });

  const formik = useFormik({
    initialValues: {
      review: review.review
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch(`/manage_review//${review.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then(r => r.json())
        .then(r => {
          onEdit(r)
          setIsEditing(false);
        })
    },
  });

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="card">
      <div>
        <img
          src={'https://static.vecteezy.com/system/resources/previews/016/079/150/original/user-profile-account-or-contacts-silhouette-icon-isolated-on-white-background-free-vector.jpg'}
          alt="User Profile"
          style={{
            width: "13px",
            height: "13px",
            marginRight: "3px",
            borderRadius: "50%",
          }}
        />
        <span>{review.user.username}:</span>
        <br></br>
        {isEditing ? (
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <br></br>
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
            <br></br>
          </form>
        ) : (
          <div style={{ overflowWrap: "break-word" }}>
            <p>"{review.review}"</p>
          </div>
        )}
      </div>
      <br></br>
      <div>
        <button onClick={handleToggleEdit}>
          {isEditing ? "Cancel" : "Edit"}
        </button>
        <button onClick={() => onDelete(review.id)}>Delete</button>
      </div>
      <br></br>
    </div>
  );
}

export default UserReview;
