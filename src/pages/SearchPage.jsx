import React, { useEffect, useState } from "react";
import Cards from "../components/Cards";
import { moviesData } from "../data/movies";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
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

  // Filter movies based on search term
  const filteredMovies = movieAverages.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movie.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movie.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Always show up to 10 movies, even if some have no ratings
  const top10Filtered = filteredMovies.slice(0, 10);

  return (
    <div className="min-vh-100" style={{ background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" }}>
      {/* Hero Section */}
      <div className="text-white text-center py-5">
        <Container>
          <h1 className="display-4 fw-bold mb-3">
            <i className="bi bi-search me-3"></i>
            Search Movies
          </h1>
          <p className="lead mb-4">
            Explore our complete movie collection
          </p>
          
          {/* Search Bar */}
          <Row className="justify-content-center">
            <Col md={8} lg={6}>
              <InputGroup size="lg" className="shadow">
                <InputGroup.Text className="bg-white border-0">
                  <i className="bi bi-search text-muted"></i>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search by title, description, or genre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-0 shadow-none"
                  style={{ fontSize: "1.1rem" }}
                />
                {searchTerm && (
                  <InputGroup.Text 
                    className="bg-white border-0 cursor-pointer"
                    onClick={() => setSearchTerm("")}
                    style={{ cursor: "pointer" }}
                  >
                    <i className="bi bi-x-circle text-muted"></i>
                  </InputGroup.Text>
                )}
              </InputGroup>
            </Col>
          </Row>
          
          {/* Results Count */}
          <div className="mt-3">
            <span className="badge bg-light text-dark px-3 py-2">
              {filteredMovies.length} movie{filteredMovies.length !== 1 ? 's' : ''} found
            </span>
          </div>
        </Container>
      </div>

      {/* Movies Grid */}
      <Container className="pb-5">
        {loading ? (
          <div className="text-center text-white py-5">
            <i className="bi bi-search display-1 mb-3"></i>
            <h3>Loading movies...</h3>
          </div>
        ) : top10Filtered.length === 0 ? (
          <div className="text-center text-white py-5">
            <i className="bi bi-search display-1 mb-3"></i>
            <h3>No movies found</h3>
            <p>Try adjusting your search terms</p>
          </div>
        ) : (
          <Row className="g-4">
            {top10Filtered.map((movie) => (
              <Col key={movie.id} xs={12} sm={6} lg={4} xl={3}>
                <Cards
                  id={movie.id}
                  title={movie.title}
                  description={movie.description}
                  averageRating={movie.averageRating}
                  genre={movie.genre}
                  year={movie.year}
                  poster={movie.poster}
                />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
}

export default SearchPage; 