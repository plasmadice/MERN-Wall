import React, { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import axios from "axios";

export default class HomePage extends Component {
  render() {
    return (
      <div className="post-container">
        <Formik
          initialValues={{ content: "words" }}
          onSubmit={(values, actions) => {
            console.log("Formik submitted", values.content);
            axios
              .post("/post/create", { content: values.content })
              .then(console.log);
          }}
          render={({ errors, status, touched, isSubmitting }) => (
            <Form>
              <Field component="textarea" name="content" />
              <ErrorMessage name="text" component="div" />
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        />
      </div>
    );
  }
}
