import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Redirect from "../components/Redirect";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchForm from "../components/SearchForm";
import PostGrid from "../components/PostGrid";
import FeedNavbar from "../components/FeedNavbar";
import styles from "./Feed.module.css";

const supabase = createClient(
  import.meta.env.VITE_SUPA_URL,
  import.meta.env.VITE_SUPA_KEY
);

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

function Feed() {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const navigate = useNavigate();

  // logging user's data     // Fetches all posts on page load
  useEffect(() => {
    async function getUserData() {
      await supabase.auth.getUser().then((value) => {
        if (value.data?.user) {
          console.log(value.data.user);
          setUser(value.data.user);
        }
      });
    }
    getUserData();
  }, []);

  // Load the posts from supabase
  useEffect(() => {
    async function getPosts() {
      try {
        const { data, error } = await supabase.from("Posts").select();
        if (error) throw error;
        if (data != null) {
          setPosts(data);
        }
      } catch (error) {
        alert(error.message);
      }
    }
    getPosts();
  }, []);

  // Retrieve Spotify access token
  useEffect(() => {
    let authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        CLIENT_ID +
        "&client_secret=" +
        CLIENT_SECRET,
    };

    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((result) => result.json())
      .then((data) => setAccessToken(data.access_token));
  }, []);

  return (
    <div>
      {Object.keys(user).length !== 0 ? (
        <>
          <FeedNavbar user={user} />

          <div className={styles.button}>
            <SearchForm user={user} accessToken={accessToken} />
          </div>

          <PostGrid posts={posts} username={user.user_metadata.name} />
        </>
      ) : (
        <>
          <Redirect />
        </>
      )}
    </div>
  );
}

export default Feed;
