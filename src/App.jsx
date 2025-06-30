import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import NavBar from "./components/NavBar";
import AddPage from "./pages/AddPage";
import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage";
import EditPage from "./pages/EditPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MovieDetailPage from "./pages/MovieDetailPage";
import 'bootstrap/dist/css/bootstrap.min.css';

import EditReviewPage from "./pages/EditReviewPage";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/add" element={<AddPage />} />
            <Route path="/edit/:id" element={<EditPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/movie/:id" element={<MovieDetailPage />} />
            <Route path="/edit-review/:id" element={<EditReviewPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
