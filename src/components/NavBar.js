import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";



export default function Navbar() {

   const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent page reload
    if (searchQuery.trim() !== "") {
      navigate(`/search/${searchQuery}`);
      setSearchQuery(""); // Clear input
    }};

  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark px-3">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">📰 NewsWave</Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/">Home</Link>
            </li>
            
            <li className="nav-item">
              <Link className="nav-link" to="/Business">Business</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Technology">Technology</Link>
            </li>
             <li className="nav-item">
              <Link className="nav-link" to="/entertainment">Entertainment</Link>
            </li>
            
          </ul>

          {/* ✅ Search Box */}
          <form className="d-flex" onSubmit={handleSearch}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search News"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>

        </div>
      </div>
    </nav>
  );
}
