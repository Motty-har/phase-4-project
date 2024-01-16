import React from "react";


function DisplayReviews({ review }) {
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
          borderRadius: "50%" 
        }}
      />
      <span>{review.user.username}:</span><br></br>
       <div style={{ overflowWrap: "break-word" }}>
        <p>"{review.review}"</p>
        </div>
      </div><br></br>
    </div>
  );
}

export default DisplayReviews;