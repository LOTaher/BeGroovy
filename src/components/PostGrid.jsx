import React from "react";
import { Row, Col } from "react-bootstrap";
import Post from "../components/Post";

let username = "";

function RenderPost(post) {
  return (
    <Col
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Post post={post} username = {username}/>
    </Col>
  );
}

function PostGrid(props) {
  const posts = props.posts;
  const NUM_DISPLAYED = 15;
  username = props.username;

  posts.sort((a, b) => {
    const diff = Date.parse(b.created_at) - Date.parse(a.created_at);
    return diff == 0 ? b.id - a.id : diff;
  });
  posts.length = NUM_DISPLAYED;

  return (
    <Row className="g-4" lg={1} xs={1}>
      {posts.map((post) => RenderPost(post))}
    </Row>
  );
}

export default PostGrid;
