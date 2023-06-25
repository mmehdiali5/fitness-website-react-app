import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationSidebar from "../nav/index.js";
import { AiOutlineSearch } from "react-icons/ai";
import Feed from "../Feed/feed";
import "../Feed/feeds.css";
import axios from "axios";
// import { Card, ListGroup } from "react-bootstrap";
const api = axios.create();

const SearchApi = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [details, setDetails] = useState(null);
  const [suggestions, setSuggestions] = useState([
    "Cardio",
    "olympic_weightlifting",
    "plyometrics",
    "powerlifting",
    "strength",
    "stretching",
    "strongman",
  ]);
  const [suggestionClicked, setSuggestionClicked] = useState(false);

  const handleSearch = async (e) => {
    if (e.key === "Enter") {
      const query = e.target.value;
      setSearchQuery(query);
      await performSearch(query);
    }
  };

  const performSearch = async (query) => {
    try {
      const response = await api.get(
        `https://api.api-ninjas.com/v1/exercises?type=${query}`,
        {
          headers: {
            "X-Api-Key": "qs5WVpBDq5Hm1QxE7W8qnQ==neepvZyKo05PG6Sb",
          },
        }
      );
      setSearchResults(response.data);
      setDetails(null);
      setSuggestionClicked(true); // Set suggestionClicked to true after performing the search
    } catch (error) {
      console.error("Error performing search:", error);
    }
  };

  const handleDetails = async (name) => {
    try {
      const response = await api.get(
        `https://api.api-ninjas.com/v1/exercises?name=${name}`,
        {
          headers: {
            "X-Api-Key": "qs5WVpBDq5Hm1QxE7W8qnQ==neepvZyKo05PG6Sb",
          },
        }
      );
      setDetails(response.data);
      setSearchResults([]);
      setSuggestionClicked(true); // Set suggestionClicked to true after fetching the details
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };

  const goBack = () => {
    setDetails(null);
    setSuggestionClicked(false); // Reset suggestionClicked to false when going back
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "beginner":
        return "green";
      case "intermediate":
        return "#8B8000";
      case "advanced":
        return "orange";
      case "expert":
        return "red";
      default:
        return "black";
    }
  };

  const handleInputChange = (e) => {
    setSuggestionClicked(false);
    setSearchQuery(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    performSearch(suggestion);
  };

  return (
    <div style={{ backgroundColor: "#f2f2f2" }}>
      <div style={{ backgroundColor: "#8AC7DB" }}>
        <Feed />
      </div>
      <div className="row">
        <div className="col-lg-2 d-none d-lg-block wd-nav">
          <NavigationSidebar />
        </div>
        <div className="col-1"></div>
        <div className="col-7 ">
          <div className="col-12 col-md-11 position-relative">
            <input
              placeholder="Search Workouts By Type"
              className="form-control rounded-pill pe-5 ps-5 search-input"
              value={searchQuery}
              onChange={handleInputChange}
              onKeyDown={handleSearch}
            />
            <AiOutlineSearch className="fs-3 position-absolute wd-nudge-upp" />
            {searchQuery &&
              !suggestionClicked && ( // Add condition to render suggestions only if suggestionClicked is false
                <div className="suggestions-container">
                  {suggestions
                    .filter((suggestion) =>
                      suggestion
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                    )
                    .map((suggestion) => (
                      <div
                        key={suggestion}
                        className="suggestion-card"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </div>
                    ))}
                </div>
              )}
          </div>
          {searchQuery && (
            <div>
              &nbsp; &nbsp;
              {searchResults.length > 0 ? (
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Search Results for "{searchQuery}":</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchResults.map((result) => (
                      <tr
                        key={result.name}
                        onClick={() => handleDetails(result.name)}
                        style={{
                          cursor: "pointer",
                          textDecoration: "underline",
                          color: "blue",
                        }}
                      >
                        <td>{result.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div></div>
              )}
            </div>
          )}
          {details && (
            <div>
              <button
                className="btn btn-primary rounded-pill searchback mb-2"
                onClick={goBack}
              >
                Back
              </button>
              {searchResults.length > 0 ? (
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Search Results for "{searchQuery}":</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchResults.map((result) => (
                      <tr
                        key={result.name}
                        onClick={() => handleDetails(result.name)}
                        style={{
                          cursor: "pointer",
                          textDecoration: "underline",
                          color: "blue",
                        }}
                      >
                        <td>{result.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div></div>
              )}
              {details.map((detail) => (
                <div key={detail.name} className="card mb-3">
                  <div className="card-body">
                    <h5 className="card-title">
                      <u>{detail.name}</u>
                    </h5>
                    <div className="card-text">
                      <p>
                        <strong>Type:</strong> {detail.type}
                      </p>
                      <p>
                        <strong>Muscle:</strong> {detail.muscle}
                      </p>
                      <p>
                        <strong>Equipment:</strong> {detail.equipment}
                      </p>
                      <p>
                        <strong>Difficulty:</strong>{" "}
                        <span
                          className="difficulty-indicator"
                          style={{
                            backgroundColor: getDifficultyColor(
                              detail.difficulty
                            ),
                          }}
                        ></span>
                        {detail.difficulty}
                      </p>
                      <p>
                        <strong>Instructions:</strong> {detail.instructions}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchApi;
