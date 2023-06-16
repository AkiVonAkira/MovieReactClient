import React, { useState, useEffect } from "react";
import styled from "styled-components";
import api from "../apiConfig";
import ErrorPopup from "../ErrorPopup";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-flow: row;
  flex-wrap: wrap;
  padding: 1.5rem;
  gap: 1em;
  background-color: var(--primary);
  border-radius: 0.5rem;
  box-shadow: 0 10px 20px -15px black;
`;

const MovieWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 0.5rem;
  background-color: var(--secondary);
  border-radius: 0.5rem;
  box-shadow: 0 10px 20px -15px black;
  gap: 1em;
`;

const SearchBoxWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-grow: 1;
  width: 100%;
`;

const StyledInputWrapper = styled.input`
  flex: 1;
  height: 2rem;
  width: 100%;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  background-color: transparent;
  padding: 0.5em;
  font-size: 1rem;
  outline: none;
  transition: box-shadow 0.2s ease-in-out;

  &::placeholder {
    color: #b1b1b1;
  }

  &:focus-visible {
    box-shadow: 0 10px 20px -15px black;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const Home = () => {
  const [searchedGenre, setSearchedGenre] = useState("");
  const [movies, setMovies] = useState([]);
  const [genreData, setGenreData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGenreData();
  }, []);

  const fetchGenreData = async () => {
    try {
      const response = await api.get("/api/genre/");
      setGenreData(response.data);
    } catch (error) {
      setError("An error occurred while fetching genre data.");
      console.error("An error occurred while fetching genre data:", error);
    }
  };

  const fetchMovies = async (genreName) => {
    try {
      const response = await api.get(
        `/api/movie/discover/?genreName=${genreName}`
      );
      setMovies(response.data);
    } catch (error) {
      setError("An error occurred while fetching movie data.");
      console.error("An error occurred while fetching movie data:", error);
    }
  };

  const handleGenreSearch = (event) => {
    const genre = event.target.value;
    setSearchedGenre(genre);
    if (genreData.includes(genre)) {
      fetchMovies(genre);
    } else {
      setMovies([]);
    }
  };

  return (
    <HomeContainer>
      <SearchBoxWrapper>
        <StyledInputWrapper
          type="text"
          placeholder="Search by genre..."
          value={searchedGenre}
          onChange={handleGenreSearch}
        />
      </SearchBoxWrapper>
      {movies.map((movie) => (
        <MovieWrapper key={movie.name}>
          <h3>{movie.movieName}</h3>
          <p>
            <strong>Movie Link:</strong>{" "}
            <a href={movie.movieLink} target="_blank" rel="noopener noreferrer">
              {movie.movieLink}
            </a>
          </p>
          <p>
            <strong>TMDB ID:</strong> {movie.tmbdId}
          </p>
        </MovieWrapper>
      ))}
      {error && <ErrorPopup message={error} onClose={() => setError(null)} />}
    </HomeContainer>
  );
};

export default Home;
