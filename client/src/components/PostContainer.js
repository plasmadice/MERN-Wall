import React from "react";
import { ListGroup } from "shards-react";

const PostContainer = props => {
  console.log(props.children);
  return <ListGroup>{props.children}</ListGroup>;
};

export default PostContainer;
