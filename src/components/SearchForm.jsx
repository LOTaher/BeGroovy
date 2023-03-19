import React from 'react'
import { createClient } from "@supabase/supabase-js"
import { useEffect, useState } from 'react'
import { Container, Nav, Navbar, Form, Button, Row, Col} from "react-bootstrap"
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
                    <h3>Post Your Song</h3>
                    <Form.Group>
                        <Form.Label>Song Name</Form.Label>
                        <Form.Control type="text" id="song_name" onChange={(e) => setName(e.target.value)}/>
                        <Form.Label>Artist</Form.Label>
                        <Form.Control type="text" id="artist" onChange={(e) => setArtist(e.target.value)}/>
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" id="song_description" onChange={(e) => setDescription(e.target.value)}/>
                    </Form.Group>
                    <br></br>
                    <Button onClick={() => search()}>Confirm</Button> 
                    <br></br>
                    <Button variant="success" onClick={() => createPost()}>Post</Button>
                </Container>
        </div>
    )
}

export default SearchForm