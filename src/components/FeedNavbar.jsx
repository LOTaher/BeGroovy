import React from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";

const supabase = createClient(
  import.meta.env.VITE_SUPA_URL,
  import.meta.env.VITE_SUPA_KEY
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
      <Navbar.Brand>
        <a href="#">
          <img
            alt=""
            src="BeGroovy.png"
            width="190"
            height="60"
            className="d-inline-block align-top"
          />{" "}
        </a>
      </Navbar.Brand>
      {/* <Navbar.Brand href="/feed">BeGroovy</Navbar.Brand> */}
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
