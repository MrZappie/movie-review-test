import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8010/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_email: email,
          user_password: password
        })
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Failed to log in");
      } else {
        login({
          id: data.user.user_id,
          username: data.user.user_name,
          email: data.user.user_email,
          createdAt: new Date().toISOString()
        });
        navigate("/");
      }
    } catch (error) {
      setError("Failed to log in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={6} lg={4}>
            <Card className="shadow-lg border-0">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <h1 className="fw-bold text-primary mb-2">
                    <i className="bi bi-person-circle me-2"></i>
                    Welcome Back
                  </h1>
                  <p className="text-muted">Sign in to your account</p>
                </div>

                {error && (
                  <Alert variant="danger" className="mb-4">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    {error}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">
                      <i className="bi bi-envelope me-2"></i>
                      Email Address
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      size="lg"
                      className="border-2"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">
                      <i className="bi bi-lock me-2"></i>
                      Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your password..."
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      size="lg"
                      className="border-2"
                    />
                  </Form.Group>

                  <div className="d-grid mb-4">
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="fw-semibold"
                      disabled={loading}
                      style={{ 
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        border: "none"
                      }}
                    >
                      {loading ? (
                        <>
                          <i className="bi bi-arrow-clockwise me-2"></i>
                          Signing In...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-box-arrow-in-right me-2"></i>
                          Sign In
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="text-center">
                    <p className="text-muted mb-0">
                      Don't have an account?{" "}
                      <Link to="/register" className="text-primary text-decoration-none fw-semibold">
                        Sign up here
                      </Link>
                    </p>
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

export default LoginPage; 