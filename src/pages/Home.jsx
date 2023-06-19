/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import ErrorPopup from "../components/ErrorPopup";
import {
  handleError,
  clearErrors,
  getErrorsFromLocalStorage
} from "../utils/ErrorUtils";

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

const Title = styled.h2`
  font-size: 2.5rem;
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

const SearchBoxWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-grow: 1;
  flex-wrap: wrap;
  flex-direction: column;
  background: var(--secondary);
  padding: 1em;
  border-radius: 0.5rem;
  box-shadow: 0 10px 20px -15px black;
  gap: 1em;
`;

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-grow: 1;
  flex-wrap: wrap;
  flex-direction: row;
  background: var(--secondary);
  padding: 1em;
  border-radius: 0.5rem;
  box-shadow: 0 10px 20px -15px black;
  gap: 1em;
  p {
    background: var(--primary);
    flex-grow: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    min-width: 6em;
    font-size: 1.25rem;
  }
`;

const StyledInputWrapper = styled.input`
  flex: 1;
  height: 2rem;
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
  justify-content: space-between;
  flex-grow: 1;
`;

const GenreList = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
  margin: 0;

  p {
    background: var(--primary);
    flex-grow: 1;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    min-width: 6em;
  }
  li {
    background: var(--primary);
    flex-grow: 1;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    min-width: 6em;
    &.active {
      background-color: var(--accent);
      box-shadow: 0 10px 20px -15px black;
    }
    &:hover {
      background-color: #c20d0d;
      box-shadow: 0 10px 20px -15px black;
      cursor: pointer;
    }
  }
`;

const Home = () => {
  const [searchedGenre, setSearchedGenre] = useState("");
  const [movies, setMovies] = useState([]);
  const [genreData, setGenreData] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [activeGenre, setActiveGenre] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesDisplayed, setMoviesDisplayed] = useState(0);
  const POSTER_PREFIX = "https://image.tmdb.org/t/p/original";
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    fetchMovies();
    setErrors(getErrorsFromLocalStorage());
  }, []);

  const handleCloseError = () => {
    setErrors([]);
    clearErrors();
  };

  useEffect(() => {
    document.title = "Movie list";
    fetchMovies(1, "All");
    if (genreData.length === 0) {
      fetchGenreData();
    }
  }, []);

  useEffect(() => {
    fetchMovies(currentPage, activeGenre);
  }, [currentPage, activeGenre]);

  useEffect(() => {
    setMoviesDisplayed(filteredMovies.length);
  }, [filteredMovies]);

  const fetchMovies = (page, genre) => {
    let url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&api_key=04cb763c501f57fb2385cbde6cf894b4`;

    if (genre !== "All") {
      url += `&with_genres=${getGenreId(genre)}`;
    }

    axios
      .get(url)
      .then((res) => {
        setMovies(res.data.results);
        setFilteredMovies(res.data.results);
        setCurrentPage(page);
        setActiveGenre(genre || "All");
        setMoviesDisplayed(res.data.results.length);
      })
      .catch((error) => {
        handleError(
          "An error occurred while fetching movies from TMDB.",
          error
        );
      });
  };

  const fetchGenreData = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=04cb763c501f57fb2385cbde6cf894b4"
      );
      setGenreData(response.data.genres);
    } catch (error) {
      handleError("An error occurred while fetching genre data.", error);
    }
  };

  const handlePageChange = (page) => {
    const clampedPage = Math.max(page, 1);
    setCurrentPage(clampedPage);
    if (activeGenre === "All" || !isValidGenre(activeGenre)) {
      fetchMovies(clampedPage, "All");
      setActiveGenre("All");
      setSearchedGenre("");
    } else {
      fetchMovies(clampedPage, activeGenre);
    }
  };

  const getGenreNames = (genreIds) => {
    if (!genreIds || genreData.length === 0) {
      handleError("Could not find any genre data.");
      return null;
    }

    const genres = genreIds.map((genreId) =>
      genreData.find((genre) => genre.id === genreId)
    );
    return genres.map((genre) => {
      if (!genre) {
        handleError("Could not find any genre data.");
        return null;
      }
      return <p key={genre.id}>{genre.name}</p>;
    });
  };

  const handleGenreSearch = (event) => {
    const genre = event.target.value;
    setSearchedGenre(genre);

    if (genre === "") {
      fetchMovies(currentPage, activeGenre);
      setActiveGenre("All");
      filterMoviesByGenre("All");
    } else if (isValidGenre(genre)) {
      setActiveGenre(genre);
      filterMoviesByGenre(genre);
    } else {
      setFilteredMovies(movies);
    }
  };

  const filterMoviesByGenre = (genre) => {
    if (genre === "All") {
      setFilteredMovies(movies);
    } else {
      const filteredMovies = movies.filter((movie) =>
        movie.genre_ids.includes(getGenreId(genre))
      );
      setFilteredMovies(filteredMovies);
    }
  };

  const handleGenreFilter = (genre) => {
    if (genre === activeGenre) {
      return;
    }
    setActiveGenre(genre);
    filterMoviesByGenre(genre);
  };

  const getGenreId = (genre) => {
    const genreItem = genreData.find((genreItem) => genreItem.name === genre);
    return genreItem ? genreItem.id : null;
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
        <GenreList>
          <li
            className={activeGenre === "All" ? "active" : ""}
            onClick={() => handleGenreFilter("All")}
          >
            All
          </li>{" "}
          {genreData.map((genre) => (
            <li
              key={genre.id}
              className={activeGenre === genre.name ? "active" : ""}
              onClick={() => handleGenreFilter(genre.name)}
            >
              {genre.name}
            </li>
          ))}
        </GenreList>
      </SearchBoxWrapper>
      <PageWrapper>
        <button onClick={() => handlePageChange(currentPage - 1)}>{"<"}</button>
        {currentPage !== 1 && (
          <button onClick={() => fetchMovies(1, activeGenre)}>{"...1"}</button>
        )}
        <p>
          Page: {currentPage} - {moviesDisplayed} Movies
        </p>
        <button onClick={() => handlePageChange(currentPage + 1)}>{">"}</button>
      </PageWrapper>
      {filteredMovies.map((movie) => (
        <MovieWrapper key={movie.id}>
          <MovieImage src={POSTER_PREFIX + movie.poster_path} alt="poster" />
          <MovieInfo>
            <div>
              <Title>{movie.title}</Title>
              <Description>Rating: {movie.vote_average}</Description>
            </div>
            <p>{movie.overview}</p>
            <GenreList>{getGenreNames(movie.genre_ids)}</GenreList>
          </MovieInfo>
        </MovieWrapper>
      ))}
      {errors.length > 0 && (
        <ErrorPopup
          messages={errors.map((error) => error.message)}
          onClose={handleCloseError}
          length={errors.length}
        />
      )}
    </HomeContainer>
  );
};

export default Home;
