import React from "react";
import { Card, Button, Form } from "react-bootstrap";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";

const supabase = createClient(
  import.meta.env.VITE_SUPA_URL,
  import.meta.env.VITE_SUPA_KEY
);

function Post(props) {
  const post = props.post;
  const [fireCount, setFireCount] = useState(post.fire_count);
  const [trashCount, setTrashCount] = useState(post.trash_count);
  const username = props.username;
  const posted_by = props.post.posted_by;
  const deleteVisible = posted_by == username;

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

  async function handleDelete() {
    console.log("deleted");
    console.log(props.post.id);

    const { error } = await supabase
      .from("Posts")
      .delete()
      .eq("id", props.post.id);
    location.reload();
  }

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

        <div>
          {deleteVisible ? (
            <Button variant="danger" size="sm" onClick={() => handleDelete()}>
              {" "}
              Delete
            </Button>
          ) : null}
        </div>
      </Card.Body>
      <Card.Footer>
        <audio controls>
          <source src={post.song} type="audio/mpeg" />
        </audio>
        Posted on {new Date(post.created_at).toDateString()}
      </Card.Footer>
    </Card>
  );
}

export default Post;
