import React from 'react'
import { Row, Col} from "react-bootstrap"
import Post from "../components/Post"

function RenderPost(post) {
    return (
        <Col style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Post post={post} /> 
        </Col>
    )
}

function PostGrid(props) {
    const posts = props.posts;
    posts.sort((a, b) => a.created_at - b.created_at);
    return (
        <Row className="g-4" lg={1} xs={1}>
            {posts.map((post) => (RenderPost(post)))}
        </Row>
    )
}

export default PostGrid