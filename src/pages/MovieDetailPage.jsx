import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { moviesData } from "../data/movies";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { formatDistanceToNow } from "date-fns";

function MovieDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [movie, setMovie] = useState(null);
  const [userReview, setUserReview] = useState(null);
  const [showAddReview, setShowAddReview] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });
  const [successAlert, setSuccessAlert] = useState(false);

  useEffect(() => {
    const foundMovie = moviesData.find(m => m.id === parseInt(id));
    if (foundMovie) {
      setMovie(foundMovie);
      // Check if current user has already reviewed this movie
      const existingReview = foundMovie.reviews.find(r => r.userId === currentUser?.id);
      setUserReview(existingReview);
    }
  }, [id, currentUser]);

  const getRatingColor = (rating) => {
    if (rating >= 9.0) return "success";
    if (rating >= 8.0) return "primary";
    if (rating >= 7.0) return "warning";
    return "secondary";
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (newReview.rating > 0 && newReview.comment.trim()) {
      // Simulate adding review
      const review = {
        id: Date.now(),
        userId: currentUser.id,
        username: currentUser.username,
        rating: parseFloat(newReview.rating),
        comment: newReview.comment,
        createdAt: new Date().toISOString()
      };
      
      // Update movie reviews (in a real app, this would be an API call)
      const updatedMovie = {
        ...movie,
        reviews: [...movie.reviews, review]
      };
      setMovie(updatedMovie);
      setUserReview(review);
      setShowAddReview(false);
      setNewReview({ rating: 0, comment: "" });
      setSuccessAlert(true);
      
      setTimeout(() => setSuccessAlert(false), 3000);
    }
  };

  const handleEditReview = () => {
    navigate(`/edit-review/${id}`);
  };

  if (!movie) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center" 
           style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
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

  if (!currentUser) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center" 
           style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
        <div className="text-center text-white">
          <i className="bi bi-lock display-1 mb-3"></i>
          <h3>Please log in to view movie details</h3>
          <Button variant="light" onClick={() => navigate("/login")}>
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
      <Container className="py-5">
        {/* Movie Header */}
        <Row className="mb-5">
          <Col>
            <div className="text-white text-center">
              <h1 className="display-4 fw-bold mb-3">{movie.title}</h1>
              <div className="d-flex justify-content-center gap-3 mb-3">
                <Badge bg="outline-light" className="border border-light text-white">
                  {movie.genre}
                </Badge>
                <Badge bg="outline-light" className="border border-light text-white">
                  {movie.year}
                </Badge>
                <div className="d-flex align-items-center">
                  <span className="me-2 fw-bold text-warning" style={{ fontSize: "1.5rem" }}>
                    {movie.averageRating}
                  </span>
                  <i className="bi bi-star-fill text-warning" style={{ fontSize: "1.5rem" }}></i>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="g-4">
          {/* Movie Description */}
          <Col lg={4}>
            <Card className="h-100 shadow border-0">
              <Card.Body className="p-4">
                <h3 className="fw-bold mb-3">
                  <i className="bi bi-info-circle me-2"></i>
                  About the Movie
                </h3>
                <p className="text-muted" style={{ lineHeight: "1.8" }}>
                  {movie.description}
                </p>
                <div className="mt-4">
                  <h5 className="fw-semibold mb-2">Movie Details</h5>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Genre:</span>
                    <span className="fw-semibold">{movie.genre}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Year:</span>
                    <span className="fw-semibold">{movie.year}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Average Rating:</span>
                    <span className="fw-semibold">{movie.averageRating}/10</span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Reviews Section */}
          <Col lg={8}>
            <Card className="shadow border-0">
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h3 className="fw-bold mb-0">
                    <i className="bi bi-chat-dots me-2"></i>
                    User Reviews ({movie.reviews.length})
                  </h3>
                  {!userReview && (
                    <Button 
                      variant="primary"
                      onClick={() => setShowAddReview(true)}
                      style={{ 
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        border: "none"
                      }}
                    >
                      <i className="bi bi-plus-circle me-2"></i>
                      Add Review
                    </Button>
                  )}
                </div>

                {successAlert && (
                  <Alert variant="success" className="mb-4">
                    <i className="bi bi-check-circle-fill me-2"></i>
                    Your review has been added successfully!
                  </Alert>
                )}

                {/* Add Review Form */}
                {showAddReview && (
                  <Card className="mb-4 border-primary">
                    <Card.Body>
                      <h5 className="fw-bold mb-3">Write Your Review</h5>
                      <Form onSubmit={handleAddReview}>
                        <Row>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label className="fw-semibold">Rating</Form.Label>
                              <Form.Control
                                type="number"
                                min="1"
                                max="10"
                                step="0.1"
                                value={newReview.rating}
                                onChange={(e) => setNewReview({...newReview, rating: e.target.value})}
                                required
                              />
                            </Form.Group>
                          </Col>
                          <Col md={6} className="d-flex align-items-end">
                            <div className="d-flex align-items-center">
                              <span className="me-2 fw-bold text-warning" style={{ fontSize: "1.2rem" }}>
                                {newReview.rating || "0"}
                              </span>
                              <i className="bi bi-star-fill text-warning" style={{ fontSize: "1.2rem" }}></i>
                              <span className="ms-2 text-muted">/ 10</span>
                            </div>
                          </Col>
                        </Row>
                        <Form.Group className="mb-3">
                          <Form.Label className="fw-semibold">Comment</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            value={newReview.comment}
                            onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                            placeholder="Share your thoughts about this movie..."
                            required
                          />
                        </Form.Group>
                        <div className="d-flex gap-2">
                          <Button type="submit" variant="primary">
                            <i className="bi bi-check-circle me-2"></i>
                            Submit Review
                          </Button>
                          <Button 
                            variant="outline-secondary" 
                            onClick={() => {
                              setShowAddReview(false);
                              setNewReview({ rating: 0, comment: "" });
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </Form>
                    </Card.Body>
                  </Card>
                )}

                {/* User's Review */}
                {userReview && (
                  <Card className="mb-4 border-primary">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div>
                          <h6 className="fw-bold mb-1">Your Review</h6>
                          <small className="text-muted">
                            {formatDistanceToNow(new Date(userReview.createdAt), { addSuffix: true })}
                          </small>
                        </div>
                        <div className="d-flex align-items-center">
                          <span 
                            className="fw-bold me-2" 
                            style={{ 
                              color: `var(--bs-${getRatingColor(userReview.rating)})`,
                              fontSize: "1.2rem"
                            }}
                          >
                            {userReview.rating}
                          </span>
                          <i 
                            className="bi bi-star-fill"
                            style={{ 
                              color: `var(--bs-${getRatingColor(userReview.rating)})`,
                              fontSize: "1.2rem"
                            }}
                          ></i>
                        </div>
                      </div>
                      <p className="mb-3">{userReview.comment}</p>
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        onClick={handleEditReview}
                      >
                        <i className="bi bi-pencil me-2"></i>
                        Edit Review
                      </Button>
                    </Card.Body>
                  </Card>
                )}

                {/* Other Reviews */}
                {movie.reviews
                  .filter(review => review.userId !== currentUser?.id)
                  .map((review) => (
                    <Card key={review.id} className="mb-3">
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <div>
                            <h6 className="fw-bold mb-1">{review.username}</h6>
                            <small className="text-muted">
                              {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
                            </small>
                          </div>
                          <div className="d-flex align-items-center">
                            <span 
                              className="fw-bold me-2" 
                              style={{ 
                                color: `var(--bs-${getRatingColor(review.rating)})`,
                                fontSize: "1.1rem"
                              }}
                            >
                              {review.rating}
                            </span>
                            <i 
                              className="bi bi-star-fill"
                              style={{ 
                                color: `var(--bs-${getRatingColor(review.rating)})`,
                                fontSize: "1.1rem"
                              }}
                            ></i>
                          </div>
                        </div>
                        <p className="mb-0">{review.comment}</p>
                      </Card.Body>
                    </Card>
                  ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Back Button */}
        <Row className="mt-4">
          <Col className="text-center">
            <Button 
              variant="outline-light" 
              onClick={() => navigate("/")}
              size="lg"
            >
              <i className="bi bi-arrow-left me-2"></i>
              Back to Movies
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MovieDetailPage; 