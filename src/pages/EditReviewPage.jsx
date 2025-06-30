import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

function EditReviewPage() {
  const { id } = useParams(); // review_id
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [review, setReview] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [successAlert, setSuccessAlert] = useState(false);
  const [failureAlert, setFailureAlert] = useState(false);
  const [movieTitle, setMovieTitle] = useState("");

  useEffect(() => {
    async function fetchReview() {
      try {
        const res = await fetch("http://localhost:8010/review/list");
        const allReviews = await res.json();
        const foundReview = allReviews.find(r => String(r.review_id) === String(id));
        setReview(foundReview);
        if (foundReview) {
          setRating(foundReview.rating);
          setComment(foundReview.description);
          // Optionally fetch movie title from local data if available
          try {
            const movieRes = await import("../data/movies");
            const movie = movieRes.moviesData.find(m => m.id === foundReview.movie_id);
            setMovieTitle(movie ? movie.title : "");
          } catch {}
        }
      } catch {
        setFailureAlert(true);
      }
    }
    fetchReview();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFailureAlert(false);
    setSuccessAlert(false);
    if (!review) return setFailureAlert(true);
    try {
      await fetch(`http://localhost:8010/review/edit/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, description: comment })
      });
      setSuccessAlert(true);
      setTimeout(() => {
        navigate(`/movie/${review.movie_id}`);
      }, 1500);
    } catch {
      setFailureAlert(true);
    }
  };

  if (!currentUser) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
        <div className="text-center text-white">
          <i className="bi bi-lock display-1 mb-3"></i>
          <h3>Please log in to edit your review</h3>
          <Button variant="light" onClick={() => navigate("/login")}>Sign In</Button>
        </div>
      </div>
    );
  }

  if (!review) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
        <div className="text-center text-white">
          <i className="bi bi-exclamation-triangle display-1 mb-3"></i>
          <h3>Review not found</h3>
          <Button variant="light" onClick={() => navigate(-1)}>Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="shadow-lg border-0">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <h1 className="fw-bold text-primary mb-2">
                    <i className="bi bi-pencil-square me-2"></i>
                    Edit Your Review
                  </h1>
                  <p className="text-muted">Update your review for <b>{movieTitle}</b></p>
                </div>
                {successAlert && (
                  <Alert variant="success" className="mb-4">
                    <i className="bi bi-check-circle-fill me-2"></i>
                    Review updated! Redirecting...
                  </Alert>
                )}
                {failureAlert && (
                  <Alert variant="danger" className="mb-4">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    Something went wrong. Please try again.
                  </Alert>
                )}
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">
                      <i className="bi bi-star me-2"></i>
                      Rating
                    </Form.Label>
                    <Form.Control
                      type="number"
                      min="1"
                      max="10"
                      step="0.1"
                      value={rating}
                      onChange={e => setRating(e.target.value)}
                      required
                      size="lg"
                      className="border-2"
                    />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">
                      <i className="bi bi-chat-text me-2"></i>
                      Comment
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      value={comment}
                      onChange={e => setComment(e.target.value)}
                      required
                      className="border-2"
                    />
                  </Form.Group>
                  <div className="d-flex gap-3">
                    <Button 
                      variant="outline-secondary" 
                      size="lg" 
                      className="fw-semibold flex-fill"
                      onClick={() => navigate(`/movie/${review.movie_id}`)}
                    >
                      <i className="bi bi-arrow-left me-2"></i>
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="fw-semibold flex-fill"
                      style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", border: "none" }}
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
      </Container>
    </div>
  );
}

export default EditReviewPage; 