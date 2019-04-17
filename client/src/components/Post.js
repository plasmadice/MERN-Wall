import React, { Component } from "react";
import axios from "axios";
import { ListGroupItem, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default class Post extends Component {
  handleClick = () => {
    // Removes posts when logged in
    const { removePost } = this.props;
    const { _id, creatorId } = this.props.post;

    axios
      .post("/post/delete", {
        creatorId: creatorId,
        postId: _id
      })
      .then(response => {
        console.log(response);
        if (!response.data.error) {
          removePost(_id);
          // console.log("post deleted");
        } else {
          // console.log("Error", response.data.error);
        }
      });
  };

  render() {
    const { post, user } = this.props;
    return (
      <ListGroupItem className="post-item">
        <p className="post-creator">{post.creatorUsername}</p>
        <p className="post-content">{post.content}</p>
        <p className="post-date">
          {post.created}{" "}
          {user && post.creatorId === user._id ? (
            <Button
              className="post-delete-button"
              theme="secondary"
              onClick={this.handleClick}
            >
              Delete
            </Button>
          ) : null}
        </p>
      </ListGroupItem>
    );
  }
}
