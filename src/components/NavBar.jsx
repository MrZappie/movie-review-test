import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, useLocation } from "react-router-dom";

function NavBar() {
  const location = useLocation();

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand>
            <Link to="/" className="text-decoration-none text-white">
              <i className="bi bi-film me-2" style={{ fontSize: "1.5rem" }}></i>
              <span style={{ fontSize: "1.5rem", fontWeight: "600" }}>MovieReview</span>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link 
                as={Link} 
                to="/" 
                className={`me-3 ${location.pathname === "/" ? "active fw-bold" : ""}`}
              >
                <i className="bi bi-star-fill me-1"></i>
                Top Movies
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                to="/search" 
                className={`me-3 ${location.pathname === "/search" ? "active fw-bold" : ""}`}
              >
                <i className="bi bi-search me-1"></i>
                Search Movies
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                to="/add" 
                className={`${location.pathname === "/add" ? "active fw-bold" : ""}`}
              >
                <i className="bi bi-plus-circle me-1"></i>
                Add Review
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
