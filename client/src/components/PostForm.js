import React, { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import axios from "axios";
import { Button } from "shards-react";

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
            <Form
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "10px"
              }}
            >
              <Field
                component="textarea"
                name="content"
                placeholder="Create a post"
                style={{
                  borderRadius: "5px",
                  margin: "5px"
                }}
              />
              <ErrorMessage name="text" component="div" />
              <Button type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </Form>
          )}
        />
      </div>
    );
  }
}
