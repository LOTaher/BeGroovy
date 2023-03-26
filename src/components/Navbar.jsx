import React from 'react'
import { Container, Nav, Navbar } from "react-bootstrap"

function FeedNavbar(props) {

    const user = props.user;

    // Sign Out Button
    async function signOutUser() {
        const { error } = await supabase.auth.signOut()
        navigate("/")
    }

    return (
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
    )
}

export default FeedNavbar