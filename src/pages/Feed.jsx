import { createClient } from "@supabase/supabase-js"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react'
import Redirect from "../components/Redirect"
import { Container, Nav, Navbar, Form, Button, Row, Col} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'
import Post from "../components/Post"
import SearchForm from "../components/SearchForm"


const supabase = createClient('https://uktonbtcsnwrpwwsrikr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrdG9uYnRjc253cnB3d3NyaWtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzcxNjU5ODIsImV4cCI6MTk5Mjc0MTk4Mn0.3o3Xz3XlW_4Kq-375e8DZUALcosQ4Bb874gib7GfAJE')

// const CDNURL = "https://uktonbtcsnwrpwwsrikr.supabase.co/storage/v1/object/public/videos/"

const CLIENT_ID = "3e40fd4145da44fda00188b61165330e"
const CLIENT_SECRET = "7f87767044644d1cb35ee51d408fb944"

function Feed() {
    const [user, setUser] = useState({})
    const [info, setInfo] = useState({})
   // const [video, setVideo] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [posts, setPosts] = useState([])
    const [accessToken, setAccessToken] = useState("")
    const [artist, setArtist] = useState("")
    const [confirming, setConfirming] = useState(false) // 
    const navigate = useNavigate()
   

    // logging user's data     // Fetches all posts on page load
    useEffect(() => {
        async function getUserData() {
            await supabase.auth.getUser().then((value) => {
                if (value.data?.user) {
                    console.log(value.data.user)
                    setUser(value.data.user)
                }
            })
        }
        getUserData()
    }, [])

    // Load the posts from supabase
    useEffect(() => {
        async function getPosts() {
            try {
                const { data, error } = await supabase
                .from("Posts")
                .select()
                .limit(15)
                if (error) throw error
                if (data != null) {
                    setPosts(data)
                }
            } 
            catch (error) {
                alert(error.message)
            }
        }
        getPosts()
    }, [])

    // Retrieve Spotify access token 
    useEffect(() => {
        
        let authParameters = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
        }

        fetch('https://accounts.spotify.com/api/token', authParameters)
        .then(result => result.json())
        .then(data => setAccessToken(data.access_token))
    }, [])


    // Sign Out Button
    async function signOutUser() {
        const { error } = await supabase.auth.signOut()
        navigate("/")
    }



    
    
    return (
        <div>
            { Object.keys(user).length !== 0 ?
                <>
                <Navbar>
                    <Container>
                        <Navbar.Brand>Oasis Project</Navbar.Brand>
                    <Nav>
                        <Nav.Item>Signed in as {user.user_metadata.name}</Nav.Item>
                        <Nav.Item>
                        <button onClick={() => signOutUser()}>Sign Out</button>
                        </Nav.Item>
                    </Nav>
                    </Container>
                </Navbar>
                
                <SearchForm user={user} name={name} artist={artist} setName={setName} setArtist={setArtist} setDescription={setDescription} accessToken={accessToken} info={info} setInfo={setInfo} description={description}/>

                <hr></hr>
                <h3>Feed</h3>
                <Row className="g-4" lg={1} xs={1}>
                    {posts.map((post) => (
                        <Col>
                            <Post post={post} /> 
                        </Col>
                    ))}
                </Row>
                </>
            :
                <> 
                <Redirect />
                </>
            }                  
        </div>
    )
}

export default Feed