import React from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import { useNavigate } from "react-router-dom";

function Cards({ key, id, title, description, averageRating, genre, year }) {
  const navigate = useNavigate();

  const getRatingColor = (rating) => {
    if (rating >= 9.0) return "success";
    if (rating >= 8.0) return "primary";
    if (rating >= 7.0) return "warning";
    return "secondary";
  };

  const handleCardClick = () => {
    navigate(`/movie/${id}`);
  };

  return (
    <Card 
      className="movie-card h-100 shadow-sm border-0" 
      key={key}
      style={{
        background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
        cursor: "pointer"
      }}
      onClick={handleCardClick}
    >
      <Card.Body className="p-4">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div className="flex-grow-1" style={{ paddingRight: "60px" }}>
            <Card.Title className="fw-bold text-dark mb-2" style={{ fontSize: "1.25rem" }}>
              {title}
            </Card.Title>
            <div className="d-flex gap-2 mb-2">
              {genre && (
                <Badge bg="outline-secondary" className="border border-secondary text-secondary">
                  {genre}
                </Badge>
              )}
              {year && (
                <Badge bg="outline-info" className="border border-info text-info">
                  {year}
                </Badge>
              )}
            </div>
          </div>
          <div className="text-end">
            <div className="d-flex align-items-center">
              <span 
                className="fw-bold me-1" 
                style={{ 
                  fontSize: "1.5rem",
                  color: `var(--bs-${getRatingColor(averageRating)})`
                }}
              >
                {averageRating}
              </span>
              <i
                className="bi bi-star-fill"
                style={{ 
                  fontSize: "1.25rem",
                  color: `var(--bs-${getRatingColor(averageRating)})`
                }}
              ></i>
            </div>
          </div>
        </div>
        
        <Card.Text className="text-muted mb-3" style={{ lineHeight: "1.6" }}>
          {description}
        </Card.Text>
        
        <footer className="text-muted small">
          <i className="bi bi-eye me-1"></i>
          Click to view details and reviews
        </footer>
      </Card.Body>
    </Card>
  );
}

export default Cards;
