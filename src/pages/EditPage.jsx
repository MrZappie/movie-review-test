import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { moviesData } from "../data/movies";

function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [successAlert, setSuccessAlert] = useState(false);
  const [failureAlert, setFailureAlert] = useState(false);
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    // Find the movie by ID
    const foundMovie = moviesData.find(m => m.id === parseInt(id));
    if (foundMovie) {
      setMovie(foundMovie);
      setTitle(foundMovie.title);
      setDescription(foundMovie.description);
      setRating(foundMovie.rating);
      setGenre(foundMovie.genre);
      setYear(foundMovie.year);
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFailureAlert(false);
    setSuccessAlert(false);
    
    const updatedData = { title, description, rating, genre, year };
    console.log("Updated movie data:", updatedData);
    
    // Simulate API call for now
    try {
      // For demo purposes, we'll just show success
      setSuccessAlert(true);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setFailureAlert(true);
    }
  };

  if (!movie) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center" 
           style={{ background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" }}>
        <div className="text-center text-white">
          <i className="bi bi-exclamation-triangle display-1 mb-3"></i>
          <h3>Movie not found</h3>
          <Button variant="light" onClick={() => navigate("/")}>
            Go Back Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100" style={{ background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" }}>
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="shadow-lg border-0">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <h1 className="fw-bold text-primary mb-2">
                    <i className="bi bi-pencil-square me-2"></i>
                    Edit Movie Review
                  </h1>
                  <p className="text-muted">Update the details for "{movie.title}"</p>
                </div>

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">
                      <i className="bi bi-film me-2"></i>
                      Movie Title
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter movie title..."
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      size="lg"
                      className="border-2"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">
                      <i className="bi bi-chat-text me-2"></i>
                      Description
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="Write your review or movie description..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                      className="border-2"
                    />
                  </Form.Group>

                  <Row className="mb-4">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="fw-semibold">
                          <i className="bi bi-tag me-2"></i>
                          Genre
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="e.g., Drama, Action, Comedy..."
                          value={genre}
                          onChange={(e) => setGenre(e.target.value)}
                          required
                          size="lg"
                          className="border-2"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="fw-semibold">
                          <i className="bi bi-calendar me-2"></i>
                          Year
                        </Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="e.g., 1994"
                          value={year}
                          onChange={(e) => setYear(e.target.value)}
                          required
                          size="lg"
                          className="border-2"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">
                      <i className="bi bi-star me-2"></i>
                      Rating
                    </Form.Label>
                    <Row>
                      <Col md={6}>
                        <Form.Control
                          type="number"
                          min="1"
                          max="10"
                          step="0.1"
                          placeholder="Rating (1-10)"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                          required
                          size="lg"
                          className="border-2"
                        />
                      </Col>
                      <Col md={6} className="d-flex align-items-center">
                        <div className="d-flex align-items-center">
                          <span className="me-2 fw-bold text-warning" style={{ fontSize: "1.2rem" }}>
                            {rating || "0"}
                          </span>
                          <i className="bi bi-star-fill text-warning" style={{ fontSize: "1.2rem" }}></i>
                          <span className="ms-2 text-muted">/ 10</span>
                        </div>
                      </Col>
                    </Row>
                  </Form.Group>

                  <div className="d-flex gap-3">
                    <Button 
                      variant="outline-secondary" 
                      size="lg" 
                      className="fw-semibold flex-fill"
                      onClick={() => navigate("/")}
                    >
                      <i className="bi bi-arrow-left me-2"></i>
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="fw-semibold flex-fill"
                      style={{ 
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        border: "none"
                      }}
                    >
                      <i className="bi bi-check-circle me-2"></i>
                      Update Review
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Alerts */}
        {successAlert && (
          <Row className="justify-content-center mt-4">
            <Col md={8} lg={6}>
              <Alert variant="success" className="text-center border-0 shadow">
                <i className="bi bi-check-circle-fill me-2"></i>
                Movie updated successfully! Redirecting...
              </Alert>
            </Col>
          </Row>
        )}

        {failureAlert && (
          <Row className="justify-content-center mt-4">
            <Col md={8} lg={6}>
              <Alert variant="danger" className="text-center border-0 shadow">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                Something went wrong. Please try again.
              </Alert>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
}

export default EditPage; 