import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "react-bootstrap/Button";

function NavBar() {
  const location = useLocation();
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

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
            <Nav className="me-auto">
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
            </Nav>
            
            <Nav className="ms-auto">
              {currentUser ? (
                <>
                  <div className="d-flex align-items-center me-3">
                    <span className="text-light me-2">
                      <i className="bi bi-person-circle me-1"></i>
                      {currentUser.username}
                    </span>
                  </div>
                  <Button 
                    variant="outline-light" 
                    size="sm"
                    onClick={handleLogout}
                  >
                    <i className="bi bi-box-arrow-right me-1"></i>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Nav.Link 
                    as={Link} 
                    to="/login" 
                    className={`me-2 ${location.pathname === "/login" ? "active fw-bold" : ""}`}
                  >
                    <i className="bi bi-box-arrow-in-right me-1"></i>
                    Login
                  </Nav.Link>
                  <Nav.Link 
                    as={Link} 
                    to="/register" 
                    className={location.pathname === "/register" ? "active fw-bold" : ""}
                  >
                    <i className="bi bi-person-plus me-1"></i>
                    Register
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
