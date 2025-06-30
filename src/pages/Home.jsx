import React, { useEffect, useState } from "react";
import Cards from "../components/Cards";
import { moviesData } from "../data/movies";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Home() {
  const [movieAverages, setMovieAverages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAndCalculate() {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:8010/review/list");
        const allReviews = await res.json();
        // For each movie, calculate average rating from reviews
        const moviesWithAvg = moviesData.map(movie => {
          const reviews = allReviews.filter(r => r.movie_id === movie.id);
          const avg = reviews.length > 0 ? (reviews.reduce((sum, r) => sum + (parseFloat(r.rating) || 0), 0) / reviews.length).toFixed(2) : null;
          return { ...movie, averageRating: avg };
        });
        setMovieAverages(moviesWithAvg);
      } catch {
        setMovieAverages(moviesData.map(m => ({ ...m, averageRating: null })));
      }
      setLoading(false);
    }
    fetchAndCalculate();
  }, []);

  // Sort: movies with ratings first, then by rating desc, then by title
  const topMovies = movieAverages
    .slice() // copy
    .sort((a, b) => {
      if (a.averageRating === null && b.averageRating !== null) return 1;
      if (a.averageRating !== null && b.averageRating === null) return -1;
      if (a.averageRating !== null && b.averageRating !== null) {
        if (b.averageRating !== a.averageRating) return b.averageRating - a.averageRating;
      }
      // fallback: sort by title
      return a.title.localeCompare(b.title);
    })
    .slice(0, 10);

  return (
    <div className="min-vh-100" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
      {/* Hero Section */}
      <div className="text-white text-center py-5">
        <Container>
          <h1 className="display-4 fw-bold mb-3">
            <i className="bi bi-star-fill me-3"></i>
            Top 10 Movies
          </h1>
          <p className="lead mb-0">
            Discover the highest-rated movies of all time
          </p>
        </Container>
      </div>

      {/* Movies Grid */}
      <Container className="pb-5">
        {loading ? (
          <div className="text-center text-light py-5">Loading top movies...</div>
        ) : topMovies.length === 0 ? (
          <div className="text-center text-light py-5">No movies found.</div>
        ) : (
          <Row className="g-4">
            {topMovies.map((movie, index) => (
              <Col key={movie.id} xs={12} sm={6} lg={4} xl={3}>
                <div className="position-relative">
                  {/* Rank Badge */}
                  <div 
                    className="position-absolute top-0 end-0"
                    style={{ 
                      zIndex: 1,
                      margin: "10px"
                    }}
                  >
                    <span 
                      className="badge rounded-pill"
                      style={{
                        backgroundColor: index < 3 ? "#ffd700" : "#6c757d",
                        color: index < 3 ? "#000" : "#fff",
                        fontSize: "0.9rem",
                        fontWeight: "bold",
                        padding: "8px 12px"
                      }}
                    >
                      #{index + 1}
                    </span>
                  </div>
                  <Cards
                    id={movie.id}
                    title={movie.title}
                    description={movie.description}
                    averageRating={movie.averageRating}
                    genre={movie.genre}
                    year={movie.year}
                    poster={movie.poster}
                  />
                </div>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
}

export default Home;
