import { createClient } from "@supabase/supabase-js"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react'
import Redirect from "../components/Redirect"
import 'bootstrap/dist/css/bootstrap.min.css'
import SearchForm from "../components/SearchForm"
import PostGrid from "../components/PostGrid"
import FeedNavbar from "../components/FeedNavbar"

const supabase = createClient('https://uktonbtcsnwrpwwsrikr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrdG9uYnRjc253cnB3d3NyaWtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzcxNjU5ODIsImV4cCI6MTk5Mjc0MTk4Mn0.3o3Xz3XlW_4Kq-375e8DZUALcosQ4Bb874gib7GfAJE')

// const CDNURL = "https://uktonbtcsnwrpwwsrikr.supabase.co/storage/v1/object/public/videos/"

const CLIENT_ID = "3e40fd4145da44fda00188b61165330e"
const CLIENT_SECRET = "7f87767044644d1cb35ee51d408fb944"

function Feed() {
    const [user, setUser] = useState({})
   // const [video, setVideo] = useState("")
    const [posts, setPosts] = useState([])
    const [accessToken, setAccessToken] = useState("")
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
    
    
    return (
        <div>
            { Object.keys(user).length !== 0 ?
                <>
                    <FeedNavbar user={user}/>

                    <hr></hr>

                    <SearchForm user={user} accessToken={accessToken}/>

                    <PostGrid posts={posts}/>
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