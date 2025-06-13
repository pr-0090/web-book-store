import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const [searchTitle, setSearchTitle] = React.useState("");
  const [searchAuthor, setSearchAuthor] = React.useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality or navigate to search results
    navigate(`/catalogue?title=${searchTitle}&author=${searchAuthor}`);
  };

  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1 className="landing-title">AWESOME BOOKSTORE</h1>
        <p className="landing-subtitle">
            GET YOUR NEW BOOK
            WITH THE BEST PRICE
        </p>

        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="BOOK TITLE"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
          />
          <input
            type="text"
            className="search-input"
            placeholder="AUTHOR"
            value={searchAuthor}
            onChange={(e) => setSearchAuthor(e.target.value)}
          />
          <button className="search-button" onClick={handleSearch}>
            SEARCH
          </button>
        </div>
      </div>

      <div className="illustration-container">
        <div className="blob"></div>
        <div className="yellow-circle circle1"></div>
        <div className="yellow-circle circle2"></div>
      </div>
    </div>
  );
};

export default LandingPage;
