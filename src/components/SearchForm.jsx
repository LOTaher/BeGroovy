import React from "react";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import {
  Container,
  Nav,
  Navbar,
  Form,
  Button,
  Row,
  Col,
  Modal,
  Card,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const supabase = createClient(
  import.meta.env.VITE_SUPA_URL,
  import.meta.env.VITE_SUPA_KEY
);

const SearchForm = (props) => {
  const user = props.user;

  const accessToken = props.accessToken;
  const [artist, setArtist] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [info, setInfo] = useState({});
  const [show, setShow] = useState(false);
  const [searched, setSearched] = useState(false);
  const handleClose = () => {
    setShow(false);
    setSearched(false);
  };
  const handleShow = () => setShow(true);

  async function search() {
    let trackParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };

    let trackSearch = await fetch(
      "https://api.spotify.com/v1/search?q=" +
        name +
        " " +
        artist +
        "&type=track",
      trackParameters
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setInfo(data);
      });
    setSearched(true);
  }

  async function createPost() {
    try {
      const { data, error } = await supabase
        .from("Posts")
        .insert({
          posted_by: user.user_metadata.name,
          song_name: info.tracks.items[0].name,
          description: description,
          song_artist: info.tracks.items[0].artists[0].name,
          song_image: info.tracks.items[0].album.images[0].url,
          song_preview: info.tracks.items[0].external_urls.spotify,
          song: info.tracks.items[0].preview_url,
        })
        .single();
      console.log("Posted!");

      if (error) throw error;
    } catch (error) {
      alert(error.message);
    }

    location.reload();
  }

  const Results = () => (
    <div>
      {/* <Modal.Body> */}
      <hr></hr>
      <Card
        className="text-center"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card.Img
          variant="top"
          src={info.tracks.items[0].album.images[0].url}
        />
        <Card.Body>
          <Card.Title>
            <a
              href={info.tracks.items[0].external_urls.spotify}
              target="_blank"
            >
              {info.tracks.items[0].name}
            </a>{" "}
            - {info.tracks.items[0].artists[0].name}
          </Card.Title>
        </Card.Body>
        <Card.Footer>
          <audio controls>
            <source src={info.tracks.items[0].preview_url} type="audio/mpeg" />
          </audio>
        </Card.Footer>
      </Card>
      <hr></hr>
      <Button
        variant="success"
        onClick={() => {
          createPost();
          handleClose;
        }}
        style={{ float: "right" }}
      >
        Post
      </Button>
      {/* </Modal.Body> */}
    </div>
  );

  return (
    <div>
      <Container>
        <Button variant="primary" size="lg" onClick={handleShow}>
          Add Post
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Enter Song Details:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Song Name</Form.Label>
              <Form.Control
                type="text"
                id="song_name"
                onChange={(e) => setName(e.target.value)}
              />
              <Form.Label>Artist</Form.Label>
              <Form.Control
                type="text"
                id="artist"
                onChange={(e) => setArtist(e.target.value)}
              />
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                id="song_description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            {/* <Button variant="primary" onClick={() => { search(); createPost(); handleClose }}>Post</Button> */}
            <Button
              variant="primary"
              disabled={!(name && artist)}
              onClick={() => search()}
            >
              Search
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            {/* <Button onClick={() => search()}>Confirm</Button>  */}
            {searched ? <Results /> : null}
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default SearchForm;
