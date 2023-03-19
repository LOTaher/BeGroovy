import React from 'react'
import { createClient } from "@supabase/supabase-js"
import { useNavigate } from "react-router-dom"

const supabase = createClient('https://uktonbtcsnwrpwwsrikr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrdG9uYnRjc253cnB3d3NyaWtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzcxNjU5ODIsImV4cCI6MTk5Mjc0MTk4Mn0.3o3Xz3XlW_4Kq-375e8DZUALcosQ4Bb874gib7GfAJE')

function Home() {
    const navigate = useNavigate()

    supabase.auth.onAuthStateChange(async (e) => {
        if (e !== "SIGNED_OUT") {
          navigate("/feed")
        } else {
          navigate("/")
        }
      })

  return (
    <>
    <h1>Home Page</h1>
    <button onClick={() => navigate("/login")}>Get Started</button>
    </>
  )
}

export default Home