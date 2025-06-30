import React from "react";
import Cards from "../components/Cards";
import { moviesData } from "../data/movies";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Home() {
  // Get top 10 movies sorted by rating
  const topMovies = moviesData
    .sort((a, b) => b.rating - a.rating)
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
        <Row className="g-4">
          {topMovies.map((movie, index) => (
            <Col key={movie.id} xs={12} sm={6} lg={4} xl={3}>
              <div className="position-relative">
                {/* Rank Badge */}
                <div 
                  className="position-absolute top-0 start-0 z-1"
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
                  createdAt={movie.createdAt}
                  rating={movie.rating}
                  genre={movie.genre}
                  year={movie.year}
                />
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Home;
