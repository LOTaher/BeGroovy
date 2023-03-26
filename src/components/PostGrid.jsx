import React from 'react'
import { Row, Col} from "react-bootstrap"
import Post from "../components/Post"

function PostGrid(props) {
    const posts = props.posts;
    return (
        <div>
            <Row className="g-4" lg={1} xs={1}>
                {posts.map((post) => (
                    <Col style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Post post={post} /> 
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default PostGrid