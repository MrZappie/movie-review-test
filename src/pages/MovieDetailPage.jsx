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
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [showAddReview, setShowAddReview] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 0, description: "" });
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState("");

  // Fetch movie details from local data
  useEffect(() => {
    const foundMovie = moviesData.find(m => m.id === parseInt(id));
    if (foundMovie) {
      setMovie(foundMovie);
    }
  }, [id]);

  // Fetch reviews for this movie from backend
  const fetchReviews = async () => {
    setLoadingReviews(true);
    try {
      const res = await fetch("http://localhost:8010/review/list");
      const allReviews = await res.json();
      setReviews(allReviews.filter(r => r.movie_id === Number(id)));
    } catch (err) {
      setErrorAlert("Failed to load reviews");
    }
    setLoadingReviews(false);
  };

  useEffect(() => {
    fetchReviews();
    // eslint-disable-next-line
  }, [id]);

  // Add review
  async function handleAddReview(e) {
    e.preventDefault();
    setErrorAlert("");
    try {
      const review_id = Date.now();
      await fetch("http://localhost:8010/review/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          review_id,
          movie_id: Number(id),
          user_name: currentUser.username,
          rating: parseFloat(newReview.rating),
          description: newReview.description
        })
      });
      setShowAddReview(false);
      setNewReview({ rating: 0, description: "" });
      setSuccessAlert(true);
      fetchReviews();
      setTimeout(() => setSuccessAlert(false), 3000);
    } catch (err) {
      setErrorAlert("Failed to add review");
    }
  }

  // Edit review
  async function handleEditReview(review_id, updatedFields) {
    setErrorAlert("");
    try {
      await fetch(`http://localhost:8010/review/edit/${review_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields)
      });
      fetchReviews();
      setSuccessAlert(true);
      setTimeout(() => setSuccessAlert(false), 3000);
    } catch (err) {
      setErrorAlert("Failed to edit review");
    }
  }

  // Delete review
  async function handleDeleteReview(review_id) {
    setErrorAlert("");
    try {
      await fetch(`http://localhost:8010/review/delete/${review_id}`, {
        method: "DELETE"
      });
      fetchReviews();
    } catch (err) {
      setErrorAlert("Failed to delete review");
    }
  }

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

  // Find the current user's review (if any)
  const userReview = reviews.find(r => r.user_name === currentUser.username);

  return (
    <div className="min-vh-100" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
      <Container className="py-5">
        {/* Movie Header */}
        <Row className="mb-5">
          <Col>
            <div className="text-white text-center">
              {/* Movie Title */}
              <h1 className="display-4 fw-bold mb-3">{movie.title}</h1>

              {/* Genre & Year Badges */}
              <div className="d-flex justify-content-center gap-3 mb-3">
                <Badge
                  bg="outline-light"
                  className="text-white d-inline-flex align-items-center justify-content-center px-2 py-1 fs-5"
                >
                  {movie.genre}
                </Badge>

                <Badge
                  bg="outline-light"
                  className=" text-white d-inline-flex align-items-center justify-content-center px-2 py-1 fs-5"
                >
                  {movie.year}
                </Badge>
              </div>

              {/* Rating */}
              <div className="d-flex justify-content-center align-items-center mb-3">
                <span className="me-2 fw-bold text-warning" style={{ fontSize: "1.5rem" }}>
                  {movie.averageRating}
                </span>
                <i className="bi bi-star-fill text-warning" style={{ fontSize: "1.5rem" }}></i>
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
                    User Reviews ({reviews.length})
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
                    Success!
                  </Alert>
                )}
                {errorAlert && (
                  <Alert variant="danger" className="mb-4">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    {errorAlert}
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
                                onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
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
                            value={newReview.description}
                            onChange={(e) => setNewReview({...newReview, description: e.target.value})}
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
                              setNewReview({ rating: 0, description: "" });
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
                            {formatDistanceToNow(new Date(userReview.createdAt || Date.now()), { addSuffix: true })}
                          </small>
                        </div>
                        <div className="d-flex align-items-center">
                          <span 
                            className="fw-bold me-2" 
                            style={{ 
                              color: "#ffc107",
                              fontSize: "1.2rem"
                            }}
                          >
                            {userReview.rating}
                          </span>
                          <i
                            className="bi bi-star-fill"
                            style={{ 
                              color: "#ffc107",
                              fontSize: "1.2rem"
                            }}
                          ></i>
                        </div>
                      </div>
                      <p className="mb-3">{userReview.description}</p>
                      <div className="d-flex gap-2">
                        <Button 
                          variant="outline-primary" 
                          size="sm"
                          onClick={() => navigate(`/edit-review/${userReview.review_id}`)}
                        >
                          <i className="bi bi-pencil me-2"></i>
                          Edit Review
                        </Button>
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => handleDeleteReview(userReview.review_id)}
                        >
                          <i className="bi bi-trash me-2"></i>
                          Delete Review
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                )}

                {/* Other Reviews */}
                {loadingReviews ? (
                  <div className="text-center text-muted py-4">Loading reviews...</div>
                ) : reviews.length === 0 ? (
                  <div className="text-center text-muted py-4">No reviews yet. Be the first to review!</div>
                ) : (
                  reviews
                    .filter(review => review.user_name !== currentUser.username)
                    .map((review) => (
                      <Card key={review.review_id} className="mb-3">
                        <Card.Body>
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <div>
                              <h6 className="fw-bold mb-1">{review.user_name}</h6>
                              <small className="text-muted">
                                {formatDistanceToNow(new Date(review.createdAt || Date.now()), { addSuffix: true })}
                              </small>
                            </div>
                            <div className="d-flex align-items-center">
                              <span 
                                className="fw-bold me-2" 
                                style={{ 
                                  color: "#ffc107",
                                  fontSize: "1.1rem"
                                }}
                              >
                                {review.rating}
                              </span>
                              <i 
                                className="bi bi-star-fill"
                                style={{ 
                                  color: "#ffc107",
                                  fontSize: "1.1rem"
                                }}
                              ></i>
                            </div>
                          </div>
                          <p className="mb-0">{review.description}</p>
                        </Card.Body>
                      </Card>
                    ))
                )}
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