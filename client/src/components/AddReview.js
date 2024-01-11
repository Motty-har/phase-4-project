import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

function AddReview(){
    const formSchema = yup.object()
    formik = useFormik({
        initialValues: {
            username: "",
            review: "",
          }
    })
    return(
        <div className="card">
            <p>Add a review:</p>
        </div>
    )
}

export default AddReview