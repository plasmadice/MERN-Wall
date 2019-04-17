import React from "react";
import { ListGroup } from "react-bootstrap";

const PostContainer = props => {
  return <ListGroup className="post-list">{props.children}</ListGroup>;
};

export default PostContainer;
