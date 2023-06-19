/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
//import axios from "axios";
import styled from "styled-components";
import ErrorPopup from "../components/ErrorPopup";
import {
  handleError,
  clearErrors,
  getErrorsFromLocalStorage
} from "../utils/ErrorUtils";
import api from "../apiConfig";

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

const Title = styled.h3`
  font-size: 2rem;
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

// const MovieImage = styled.img`
//   object-fit: cover;
//   width: 12rem;
//   aspect-ratio: 5/8;
//   border-radius: 0.5rem;
//   box-shadow: 0 10px 20px -15px black;
// `;

// const MovieInfo = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 0.5rem;
//   justify-content: space-between;
//   flex-grow: 1;
// `;

// const GenreList = styled.ul`
//   display: flex;
//   flex-direction: row;
//   flex-wrap: wrap;
//   gap: 0.5rem;
//   list-style: none;
//   padding: 0;
//   margin: 0;

//   p {
//     background: var(--primary);
//     flex-grow: 1;
//     height: 3rem;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     border-radius: 0.5rem;
//     min-width: 6em;
//   }
//   li {
//     background: var(--primary);
//     flex-grow: 1;
//     height: 3rem;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     border-radius: 0.5rem;
//     min-width: 6em;
//     &.active {
//       background-color: var(--accent);
//       box-shadow: 0 10px 20px -15px black;
//     }
//     &:hover {
//       background-color: #c20d0d;
//       box-shadow: 0 10px 20px -15px black;
//       cursor: pointer;
//     }
//   }
// `;

const Movies = () => {
  const [movies, setMovies] = useState([{}]);
  // const [genreData, setGenreData] = useState([]);
  // const POSTER_PREFIX = "https://image.tmdb.org/t/p/original";
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    fetchMovies();
    setErrors(getErrorsFromLocalStorage());
  }, []);

  const handleCloseError = () => {
    setErrors([]);
    clearErrors();
  };

  const fetchMovies = async () => {
    try {
      const response = await api.get("/api/movie/");
      const fetchedMovies = response.data;
      setMovies(fetchedMovies);
      // fetchAdditionalMovieData(fetchedMovies);
    } catch (error) {
      handleError("An error occurred while fetching movie data.", error);
    }
  };

  // const fetchMovieDetails = async (tmbdId) => {
  //   try {
  //     const response = await axios.get(
  //       `https://api.themoviedb.org/3/movie/${tmbdId}?language=en-US&api_key=04cb763c501f57fb2385cbde6cf894b4`
  //     );
  //     return response.data;
  //   } catch (error) {
  //     if (error.response && error.response.status === 404) {
  //       handleError(`Movie with ID ${tmbdId} not found.`);
  //     }
  //     handleError(
  //       `An error occurred while fetching details for movie with ID: ${tmbdId}`,
  //       error
  //     );
  //     return null;
  //   }
  // };

  // const fetchAdditionalMovieData = async (oldMovies) => {
  //   try {
  //     if (genreData.length === 0) {
  //       await fetchGenreData();
  //     }

  //     const moviesWithDetails = await Promise.all(
  //       oldMovies.map(async (movie) => {
  //         if (movie.tmbdId) {
  //           try {
  //             const details = await fetchMovieDetails(movie.tmbdId);
  //             if (details && details.success !== false) {
  //               return {
  //                 ...movie,
  //                 details
  //               };
  //             } else {
  //               return movie;
  //             }
  //           } catch (error) {
  //             handleError(
  //               `An error occurred while fetching details for movie with ID: ${movie.tmbdId}`,
  //               error
  //             );
  //           }
  //         }
  //         return movie;
  //       })
  //     );

  //     const filteredMovies = moviesWithDetails.filter((movie) => movie.details);
  //     setMovies(filteredMovies);
  //   } catch (error2) {
  //     handleError(
  //       "An error occurred while fetching additional movie data.",
  //       error2
  //     );
  //   }
  // };

  // const fetchGenreData = async () => {
  //   try {
  //     const response = await axios.get(
  //       "https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=04cb763c501f57fb2385cbde6cf894b4"
  //     );
  //     setGenreData(response.data.genres);
  //   } catch (error) {
  //     handleError("An error occurred while fetching genre data.", error);
  //   }
  // };

  // const getGenreNames = (genreIds) => {
  //   if (!genreIds || genreData.length === 0) {
  //     handleError("Could not find any genre data.");
  //     return null;
  //   }

  //   const genres = genreIds.map((genreId) =>
  //     genreData.find((genre) => genre.id === genreId)
  //   );
  //   return genres.map((genre) => {
  //     if (!genre) {
  //       handleError("Could not find any genre data.");
  //       return null;
  //     }
  //     return <p key={genre.id}>{genre.name}</p>;
  //   });
  // };

  return (
    <>
      <Title>Movies</Title>
      <Description>Browse through the available movies below:</Description>

      {movies.length > 0 && (
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
                <strong>TMDB ID:</strong> {movie.tmbdId}
              </p>
            </MovieWrapper>
          ))}
        </MovieLayoutContainer>
      )}

      {/* {movies.filter((movie) => movie.details).length > 0 && (
        <MovieLayoutContainer>
          {movies
            .filter((movie) => movie.details)
            .map((movie) => (
              <MovieWrapper key={movie.details.id}>
                <MovieImage
                  src={POSTER_PREFIX + movie.details.poster_path}
                  alt="poster"
                />
                <MovieInfo>
                  <div>
                    <Title>{movie.title}</Title>
                    <Description>
                      Rating: {movie.details.vote_average}
                    </Description>
                  </div>
                  <p>{movie.details.overview}</p>
                  <GenreList>
                    {getGenreNames(movie.details.genre_ids)}
                  </GenreList>
                </MovieInfo>
              </MovieWrapper>
            ))}
        </MovieLayoutContainer>
      )} */}
      {errors.length > 0 && (
        <ErrorPopup
          messages={errors.map((error) => error.message)}
          onClose={handleCloseError}
          length={errors.length}
        />
      )}
    </>
  );
};

export default Movies;
