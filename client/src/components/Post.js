import React, { Component } from "react";
import axios from "axios";

export default class Post extends Component {
  onClick = () => {
    const { _id, creator } = this.props.post;
    axios
      .post("/post/delete", {
        creator: creator,
        postId: _id
      })
      .then(response => {
        console.log(response);
        if (!response.data.error) {
          console.log("post deleted");
        } else {
          console.log("error fam");
        }
      });
  };

  render() {
    const { post } = this.props;
    console.log(post);
    return (
      <li>
        Creator: {post.creator}
        Content: {post.content}
        Created: {post.created}
        <button onClick={this.onClick}>Delete</button>
      </li>
    );
  }
}
