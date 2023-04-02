import React from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";

const supabase = createClient(
  "https://uktonbtcsnwrpwwsrikr.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrdG9uYnRjc253cnB3d3NyaWtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzcxNjU5ODIsImV4cCI6MTk5Mjc0MTk4Mn0.3o3Xz3XlW_4Kq-375e8DZUALcosQ4Bb874gib7GfAJE"
);

function FeedNavbar(props) {
  const user = props.user;
  const navigate = useNavigate();

  // Sign Out Button
  async function signOutUser() {
    const { error } = await supabase.auth.signOut();
    navigate("/");
  }

  return (
    <Navbar sticky="top">
      <Navbar.Brand href="/feed">BeGroovy</Navbar.Brand>
      <Nav>
        {/* <Nav.Link onClick={() => navigate("/feed")}>Feed</Nav.Link> */}
        <NavDropdown title={user.user_metadata.name}>
          <NavDropdown.Item onClick={() => signOutUser()}>
            Sign Out
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar>
  );
}

export default FeedNavbar;
