import React, { Component } from "react";
import axios from "axios";
import { ListGroupItem, Button } from "shards-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";

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
      <ListGroupItem>
        Creator: {post.creator}
        Content: {post.content}
        Created: {post.created}
        {user && post.creator === user._id ? (
          <Button theme="secondary" onClick={this.handleClick}>
            Delete
          </Button>
        ) : null}
      </ListGroupItem>
    );
  }
}
