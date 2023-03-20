import React from 'react'
import { createClient } from "@supabase/supabase-js"
import { useEffect, useState } from 'react'
import { Container, Nav, Navbar, Form, Button, Row, Col, Modal} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'

const supabase = createClient('https://uktonbtcsnwrpwwsrikr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrdG9uYnRjc253cnB3d3NyaWtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzcxNjU5ODIsImV4cCI6MTk5Mjc0MTk4Mn0.3o3Xz3XlW_4Kq-375e8DZUALcosQ4Bb874gib7GfAJE')


const SearchForm = (props) => {
    const user = props.user;
    const name = props.name;
    const artist = props.artist;
    const setName = props.setName;
    const setArtist = props.setArtist;
    const description = props.description
    const setDescription = props.setDescription;
    const accessToken = props.accessToken;
    const info = props.info;
    const setInfo = props.setInfo;
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function search() {

        let trackParameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        }

        let trackSearch = await fetch('https://api.spotify.com/v1/search?q=' + name + " " + artist + '&type=track', trackParameters)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setInfo(data)
            })
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
                song_preview: info.tracks.items[0].external_urls.spotify
            })
            .single()
        console.log("Posted!")
        
        if (error) throw error
        } catch (error) {
            alert(error.message)
        }

        location.reload()

    }
    
    return (
        <div>
            <Container>
                <Button variant="primary" onClick={handleShow}>Add Post</Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Enter Song Details:</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Song Name</Form.Label>
                            <Form.Control type="text" id="song_name" onChange={(e) => setName(e.target.value)}/>
                            <Form.Label>Artist</Form.Label>
                            <Form.Control type="text" id="artist" onChange={(e) => setArtist(e.target.value)}/>
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" id="song_description" onChange={(e) => setDescription(e.target.value)}/>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        {/* <Button variant="primary" onClick={() => { search(); createPost(); handleClose }}>Post</Button> */}
                        <Button variant="primary" onClick={() => search()}>Confirm</Button>
                        <Button variant="success" onClick={() => { createPost(); handleClose }}>Post</Button>
                        <Button variant="secondary" onClick={ handleClose }>Cancel</Button>
                        {/* <Button onClick={() => search()}>Confirm</Button>  */}
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>
    )
}

export default SearchForm