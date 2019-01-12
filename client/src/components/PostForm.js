import React, { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import axios from "axios";

export default class PostForm extends Component {
  render() {
    return (
      <div className="post-container">
        <Formik
          onSubmit={(values, actions) => {
            console.log("Formik submitted", values.content);
            axios
              .post("/post/create", { content: values.content })
              .then(res => {
                console.log(res);
                this.props.getPosts();
              });
          }}
          render={({ errors, status, touched, isSubmitting }) => (
            <Form>
              <Field
                component="textarea"
                name="content"
                placeholder="Create a post"
              />
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
