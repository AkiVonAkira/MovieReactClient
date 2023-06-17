import React, { useState, useEffect } from "react";
import axios from "axios";
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
  flex-direction: row;
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

const MovieImage = styled.img`
  object-fit: cover;
  width: 12rem;
  aspect-ratio: 5/8;
  border-radius: 0.5rem;
  box-shadow: 0 10px 20px -15px black;
`;

const MovieInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Home = () => {
  const [searchedGenre, setSearchedGenre] = useState("");
  const [movies, setMovies] = useState([]);
  const [genreData, setGenreData] = useState([]);
  const [error, setError] = useState(null);
  const POSTER_PREFIX = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    document.title = "Movie list";
    fetchMovies();
    fetchGenreData();
  }, []);

  // const fetchGenreData = async () => {
  //   try {
  //     const response = await api.get("/api/genre/");
  //     setGenreData(response.data);
  //   } catch (error) {
  //     setError("An error occurred while fetching genre data.");
  //     console.error("An error occurred while fetching genre data:", error);
  //   }
  // };

  const fetchGenreData = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=04cb763c501f57fb2385cbde6cf894b4"
      );
      setGenreData(response.data.genres);
    } catch (error) {
      setError("An error occurred while fetching genre data.");
      console.error("An error occurred while fetching genre data:", error);
    }
  };

  const fetchMoviesByGenre = async (genreName) => {
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

  const fetchMovies = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=04cb763c501f57fb2385cbde6cf894b4`
      )
      .then((res) => {
        setMovies(res.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getGenreName = (genreId) => {
    const genre = genreData.find((genre) => genre.id === genreId);
    return genre ? genre.name : "";
  };

  const handleGenreSearch = (event) => {
    const genre = event.target.value;
    setSearchedGenre(genre);
    if (genreData.includes(genre.genre)) {
      fetchMoviesByGenre(genre);
    }
  };

  const isValidGenre = (genre) => {
    return genreData.find((genreItem) => genreItem.name === genre);
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
      {movies.map((movies) => (
        <MovieWrapper key={movies.id}>
          <MovieImage
            src={POSTER_PREFIX + movies.poster_path}
            alt="{movies.title} poster"
          />
          <MovieInfo>
            <h2>{movies.title}</h2>
            <p>{movies.overview}</p>
            <h3>Rating:{movies.vote_average}</h3>
            <p>Genre: {getGenreName(movies.genre_ids[0])}</p>
          </MovieInfo>
        </MovieWrapper>
      ))}
      {error && <ErrorPopup message={error} onClose={() => setError(null)} />}
    </HomeContainer>
  );
};

export default Home;
