import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

function Navigation(props) {
  return (
    <div>
      <div>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">CrowDe</Navbar.Brand>
            <Nav className="ms-auto">
              <Nav.Link href="#home" className="ms-auto">
                Campaigns
              </Nav.Link>
              <Nav.Link href="#features" className="ms-auto">
                Add
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </div>
      {props.children}
    </div>
  );
}

export default Navigation;
