import React, { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import axios from "axios";
import { Button } from "react-bootstrap";

export default class PostForm extends Component {
  render() {
    const { user } = this.props;
    return (
      <div className="post-form-container">
        <Formik
          onSubmit={(values, actions) => {
            // console.log("Formik submitted", values.content);
            axios
              .post("/post/create", {
                content: values.content,
                username: user.local.username
              })
              .then(res => {
                // console.log(res);
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
              <div className="post-button">
                <Button type="submit" disabled={isSubmitting}>
                  Submit
                </Button>
              </div>
            </Form>
          )}
        />
      </div>
    );
  }
}
