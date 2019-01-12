import React, { Component } from "react";
import axios from "axios";

export default class Post extends Component {
  handleClick = () => {
    const { removePost } = this.props;
    const { _id, creator } = this.props.post;

    axios
      .post("/post/delete", {
        creator: creator,
        postId: _id
      })
      .then(response => {
        console.log(response);
        if (!response.data.error) {
          removePost(_id);
          console.log("post deleted");
        } else {
          console.log("error fam");
        }
      });
  };

  render() {
    const { post, user } = this.props;
    return (
      <li>
        Creator: {post.creator}
        Content: {post.content}
        Created: {post.created}
        {post.creator === user._id ? (
          <button onClick={this.handleClick}>Delete</button>
        ) : null}
      </li>
    );
  }
}
