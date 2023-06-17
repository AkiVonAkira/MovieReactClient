/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import styled from "styled-components";
import api from "../apiConfig";
import ErrorPopup from "../components/ErrorPopup";

const MovieLayoutContainer = styled.div`
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

const Title = styled.h1`
  font-size: 3rem;
  display: flex;
  flex-grow: 1;
  justify-content: center;
`;

const Description = styled.p`
  font-size: 1rem;
  display: flex;
  flex-grow: 1;
  justify-content: center;
  padding-bottom: 1em;
`;

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const handleError = (errorMessage) => {
    setError(errorMessage);
  };

  const handleCloseError = () => {
    setError(null);
  };
  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await api.get("/api/movie/");
      setMovies(response.data);
    } catch (error) {
      handleError("An error occurred while fetching movie data.");
      console.error("An error occurred while fetching movie data:", error);
    }
  };

  return (
    <>
      <Title>Movies</Title>
      <Description>Browse through the available movies below:</Description>
      <MovieLayoutContainer>
        {movies.map((movie) => (
          <MovieWrapper key={movie.id}>
            <h3>{movie.movieName}</h3>
            <p>
              <strong>Movie Link:</strong>{" "}
              <a
                href={movie.movieLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {movie.movieLink}
              </a>
            </p>
            <p>
              <strong>TMDB ID:</strong> {movie.tmdbId}
            </p>
          </MovieWrapper>
        ))}
      </MovieLayoutContainer>

      {error && <ErrorPopup message={error} onClose={handleCloseError} />}
    </>
  );
};

export default Movies;
