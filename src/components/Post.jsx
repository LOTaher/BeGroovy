import React from "react";
import { Card, Button, Form } from "react-bootstrap";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";

const supabase = createClient(
  "https://uktonbtcsnwrpwwsrikr.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrdG9uYnRjc253cnB3d3NyaWtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzcxNjU5ODIsImV4cCI6MTk5Mjc0MTk4Mn0.3o3Xz3XlW_4Kq-375e8DZUALcosQ4Bb874gib7GfAJE"
);

function Post(props) {
  const post = props.post;
  const [fireCount, setFireCount] = useState(post.fire_count);
  const [trashCount, setTrashCount] = useState(post.trash_count);

  const incrementFire = async ({ id }) => {
    const { data, error } = await supabase.rpc("increment", { row_id: id });
    setFireCount(fireCount + 1);
    return data;
  };

  const incrementTrash = async ({ id }) => {
    const { data, error } = await supabase.rpc("incrementtwo", { row_id: id });
    setTrashCount(trashCount + 1);
    return data;
  };

  return (
    <Card className="text-center" style={{ width: "20rem" }}>
      <Card.Img variant="top" src={post.song_image} />
      <Card.Body>
        <Card.Title>
          <a href={post.song_preview} target="_blank">
            {post.song_name}
          </a>{" "}
          - {post.song_artist}
        </Card.Title>
        <Card.Subtitle>{post.posted_by}</Card.Subtitle>
        <Card.Text>
          <br></br>
          {post.description}
        </Card.Text>
        <Button
          variant="outline-dark"
          onClick={() => incrementFire({ id: post.id })}
        >
          🔥 {fireCount}
        </Button>
        <Button
          variant="outline-dark"
          onClick={() => incrementTrash({ id: post.id })}
        >
          🗑️ {trashCount}
        </Button>
      </Card.Body>
      <Card.Footer>
        Posted on {new Date(post.created_at).toDateString()}
      </Card.Footer>
    </Card>
  );
}

export default Post;
