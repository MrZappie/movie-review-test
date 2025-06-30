import React from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import { useNavigate } from "react-router-dom";

function Cards({ id, title, description, averageRating, genre, year, poster }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/movie/${id}`);
  };

  return (
    <Card
      className="movie-card h-100 shadow-sm border-0 position-relative overflow-hidden"
      style={{
        cursor: "pointer",
        minHeight: "300px",
        borderRadius: "20px",
        transition: "all 0.3s ease",
      }}
      onClick={handleCardClick}
    >
<<<<<<< HEAD
      <Card.Body className="p-4">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div className="flex-grow-1" style={{ paddingRight: "60px" }}>
            <Card.Title className="fw-bold text-dark mb-2" style={{ fontSize: "1.25rem" }}>
=======
      {/* Poster Background */}
      <div
        className="position-absolute w-100 h-100"
        style={{
          backgroundImage: poster
            ? `url(${poster})`
            : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderRadius: "20px",
          zIndex: 1,
        }}
      />

      {/* Gradient Overlay */}
      <div
        className="position-absolute w-100 h-100"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)",
          borderRadius: "20px",
          zIndex: 2,
        }}
      />

      {/* Hover Overlay */}
      <div
        className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center"
        style={{
          borderRadius: "20px",
          opacity: 0,
          transition: "all 0.3s ease",
          zIndex: 3,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(0,0,0,0.4)";
          e.currentTarget.style.backdropFilter = "blur(5px)";
          e.currentTarget.style.opacity = "1";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(0,0,0,0)";
          e.currentTarget.style.backdropFilter = "blur(0px)";
          e.currentTarget.style.opacity = "0";
        }}
      >
        <div className="text-center text-white">
          <i className="bi bi-eye" style={{ fontSize: "1.5rem" }}></i>
          <div style={{ fontSize: "0.9rem" }}>View Details</div>
        </div>
      </div>

      {/* Card Content */}
      <Card.Body
        className="p-3 position-relative d-flex flex-column justify-content-end text-white"
        style={{ zIndex: 4 }}
      >
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div className="flex-grow-1">
            <Card.Title className="fw-bold text-white mb-2" style={{ fontSize: "1.1rem", textShadow: "2px 2px 4px rgba(0,0,0,0.7)" }}>
>>>>>>> 4bc927c (Updated movie cards with smaller size, rounded corners, and poster backgrounds)
              {title}
            </Card.Title>
            <div className="d-flex gap-2 mb-2">
              {genre && (
                <Badge
                  bg="light"
                  className="text-dark"
                  style={{ fontSize: "0.7rem" }}
                >
                  {genre}
                </Badge>
              )}
              {year && (
                <Badge
                  bg="info"
                  className="text-white"
                  style={{ fontSize: "0.7rem" }}
                >
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
                  fontSize: "1.3rem",
                  color: "#ffd700",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
                }}
              >
                {averageRating}
              </span>
              <i
                className="bi bi-star-fill"
                style={{
                  fontSize: "1.1rem",
                  color: "#ffd700",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
                }}
              ></i>
            </div>
          </div>
        </div>

        {/* Description with text clamp */}
        <Card.Text
          className="text-white mb-2"
          style={{
            lineHeight: "1.4",
            fontSize: "0.85rem",
            textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {description}
        </Card.Text>

        <footer
          className="text-white-50 small"
          style={{
            textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
            fontSize: "0.75rem",
          }}
        >
          <i className="bi bi-eye me-1"></i> Click to view details and reviews
        </footer>
      </Card.Body>
    </Card>
  );
}

export default Cards;
