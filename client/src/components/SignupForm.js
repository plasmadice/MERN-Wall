import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";

class SignupForm extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      confirmPassword: "",
      redirectTo: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    // email validation regex
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(String(this.state.username).toLowerCase())) {
      axios
        .post("/auth/signup", {
          username: this.state.username.toLowerCase(),
          password: this.state.password
        })
        .then(response => {
          console.log(response);
          if (!response.data.error) {
            // User successfully created
            this.setState({
              redirectTo: "/login"
            });
          } else {
            // Duplicate user found
            this.setState({
              error: {
                cause: `Username ${this.state.username} already exists!`,
                solution: `Please use a different username or login if username ${
                  this.state.username
                } is yours.`
              }
            });
          }
        });
    } else {
      // If email is invalid
      this.setState({
        error: {
          cause: "Invalid Username",
          solution: "Username must be valid - example@example.com"
        }
      });
    }
  }
  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    }
    return (
      <div className="signup-form-container">
        <Form className="form-controls">
          <Form.Group>
            {!!this.state.error && (
              // Only shows if error exists
              <Alert variant="danger">
                <Alert.Heading>{this.state.error.cause}</Alert.Heading>
                <p>{this.state.error.solution}</p>
              </Alert>
            )}
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              isValid={
                this.state.password.length &&
                this.state.password === this.state.confirmPassword
              }
              isInvalid={
                this.state.password.length &&
                this.state.password !== this.state.confirmPassword
              }
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={this.handleSubmit}>
            Sign Up
          </Button>
        </Form>
      </div>
    );
  }
}

export default SignupForm;
