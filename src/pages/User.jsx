/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import styled from "styled-components";
import api, { postInstance as postApi } from "../apiConfig";
import ErrorPopup from "../components/ErrorPopup";
import {
  handleError,
  clearErrors,
  getErrorsFromLocalStorage
} from "../utils/ErrorUtils";

const UserContainer = styled.div`
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

const UserWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 0.5rem;
  background-color: var(--secondary);
  border-radius: 0.5rem;
  box-shadow: 0 10px 20px -15px black;
  gap: 1em;
  justify-content: space-between;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius: 0.5rem;
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
  &::h1 {
    box-shadow: 0 10px 20px -15px black;
  }
  &::p {
    margin: 0 !important;
    padding: 0 !important;
  }
`;

const SectionHeading = styled.h3`
  font-size: 2rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  display: flex;
  flex-grow: 1;
  justify-content: center;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0 0 1em 1em;
`;

const ListItem = styled.li`
  font-size: 1em;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  gap: 1em;
`;

const StyledInputWrapper = styled.input`
  flex: 4;
  height: 2rem;
  width: 100%;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  background-color: transparent;
  padding: 0.5em;
  font-size: 1rem;
  outline: none;
  transition: box-shadow 0.2s ease-in-out;
  margin: auto;
  gap: 1em;

  &::placeholder {
    color: #b1b1b1;
  }

  &:focus-visible {
    box-shadow: 0 10px 20px -15px black;
    border: 2px solid #ccc;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  &[type="number"] {
    flex: 1;
    appearance: textfield;
  }
`;

let inputCounter = 0;
export default function User() {
  const [userData, setUserData] = useState([]);
  const [genreData, setGenreData] = useState([]);
  const [personGenreData, setPersonGenreData] = useState({});
  const [personMovieData, setPersonMovieData] = useState({});
  const [movies, setMovies] = useState([]);
  const [inputs, setInputs] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    fetchMovies();
    setErrors(getErrorsFromLocalStorage());
  }, []);

  const handleCloseError = () => {
    setErrors([]);
    clearErrors();
  };

  const addInput = (type, personId) => {
    const existingInput = inputs.find(
      (input) => input.personId === personId && input.type === type
    );
    if (existingInput) {
      return;
    }

    const newInput = {
      id: `input_${inputCounter}`,
      personId,
      type,
      newGenre: "",
      newMovie: "",
      newRating: ""
    };
    inputCounter++;
    setInputs([...inputs, newInput]);
  };

  const updateInput = (inputId, value, inputType) => {
    const updatedInputs = inputs.map((input) => {
      if (input.id === inputId) {
        return { ...input, [inputType]: value };
      }
      return input;
    });
    setInputs(updatedInputs);
  };

  const renderGenreInputs = (personId) => {
    const genreInputs = inputs.filter(
      (input) => input.personId === personId && input.type === "genre"
    );

    return genreInputs.map((input) => (
      <Form key={input.id}>
        <StyledInputWrapper
          type="text"
          value={input.newGenre}
          placeholder="Genre Name"
          onChange={(e) => updateInput(input.id, e.target.value, "newGenre")}
        />
        {genreInputs.length === 1 ? (
          <button
            onClick={(evt) => addGenreToPerson(evt, personId, input.newGenre)}
          >
            Add Genre
          </button>
        ) : null}
      </Form>
    ));
  };

  const renderMovieInputs = (personId) => {
    const movieInputs = inputs.filter(
      (input) => input.personId === personId && input.type === "movie"
    );

    return movieInputs.map((input) => (
      <Form key={input.id}>
        <StyledInputWrapper
          type="text"
          value={input.newMovie}
          placeholder="Movie Name"
          onChange={(e) => updateInput(input.id, e.target.value, "newMovie")}
        />
        <StyledInputWrapper
          type="number"
          value={input.newRating}
          placeholder="Rating"
          min={0}
          max={10}
          onChange={(e) => updateInput(input.id, e.target.value, "newRating")}
        />
        {movieInputs.length === 1 ? (
          <button
            onClick={(evt) =>
              addMovie(evt, personId, input.newMovie, input.newRating)
            }
          >
            Add Movie
          </button>
        ) : null}
      </Form>
    ));
  };

  useEffect(() => {
    fetchUserData();
    fetchGenreData();
    fetchMovies();
  }, []);

  useEffect(() => {
    userData.forEach((person) => {
      fetchPersonGenreData(person.name);
      fetchPersonMovieData(person.name);
    });
  }, [userData]);

  const fetchMovies = async () => {
    try {
      const response = await api.get("/api/movie/");
      setMovies(response.data);
    } catch (error) {
      handleError("An error occurred while fetching movie data.", error);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await api.get("/api/person/");
      setUserData(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        handleError("An error occurred while fetching user data.", error);
      } else {
        handleError("An error occurred. The server may be down.", error);
      }
    }
  };

  const fetchGenreData = async () => {
    try {
      const response = await api.get("/api/genre/");
      setGenreData(response.data);
    } catch (error) {
      handleError("An error occurred while fetching genre data.", error);
    }
  };

  const fetchPersonGenreData = async (personName) => {
    try {
      const response = await api.get(`/api/person/genre?name=${personName}`);
      const genres = response.data;
      setPersonGenreData((prevData) => ({
        ...prevData,
        [personName]: genres
      }));
    } catch (error) {
      handleError(
        `An error occurred while fetching genre data for ${personName}.`,
        error
      );
    }
  };

  const fetchPersonMovieData = async (personName) => {
    try {
      const response1 = await api.get(`/api/person/movie?name=${personName}`);
      const response2 = await api.get(`/api/rating/person?name=${personName}`);
      const movieData = response1.data;
      const ratingData = response2.data;

      const mergedData = movieData.map((movie) => {
        const rating = ratingData.find(
          (item) => item.movieName === movie.movieName
        );
        return {
          ...movie,
          rating: rating ? rating.rating : null
        };
      });

      setPersonMovieData((prevData) => ({
        ...prevData,
        [personName]: mergedData
      }));
    } catch (error) {
      handleError(
        `An error occurred while fetching movie data for ${personName}.`,
        error
      );
    }
  };

  const addGenreToPerson = async (evt, personId, genreName) => {
    evt.preventDefault();
    try {
      const person = userData.find((person) => person.personId === personId);
      if (!person) {
        handleError("Invalid person ID");
        return;
      }
      console.log(person);
      const genre = genreData.find(
        (genre) => genreName.toLowerCase() === genre.genreName.toLowerCase()
      );
      if (!genre) {
        handleError(`Invalid genre: ${genreName}`);
        return;
      }
      console.log(genre);
      const response = await api.post("/api/person/genre", {
        personId: person.personId,
        genreId: genre.genreId
      });

      console.log(response.data);
    } catch (error) {
      handleError("An error occurred while adding genre to person.", error);
    }
  };

  const addMovie = async (evt, personId, newMovie, newRating) => {
    evt.preventDefault();
    const person = userData.find((person) => person.personId === personId);
    const movieName = newMovie;
    let rating = parseInt(newRating.trim());
    rating = Math.max(0, Math.min(rating, 10));

    try {
      const movie = movies.find((movie) => movie.movieName === movieName);

      if (!movie) {
        handleError(`Movie '${movieName}' not found.`);
        return;
      }

      const response = await api.post("/api/rating/person", {
        movieId: movie.movieId,
        personId: personId,
        rating: rating
      });

      setMovies((prevData) => [...prevData, movie]);
      setPersonMovieData((prevData) => ({
        ...prevData,
        [person.name]: [...prevData[person.name], movie]
      }));

      console.log(response.data);
    } catch (error) {
      handleError("An error occurred while adding the movie.", error);
    }
  };

  return (
    <>
      <Title>Users</Title>
      <UserContainer>
        {userData.length > 0 ? (
          userData.map((person) => (
            <UserWrapper key={person.personId}>
              <UserDetails>
                <h3>Name: {person.name}</h3>
                <p>Email: {person.email}</p>
              </UserDetails>
              <FormWrapper>
                <SectionHeading>Genres</SectionHeading>
                <List>
                  {personGenreData[person.name]?.length > 0 ? (
                    personGenreData[person.name].map((genre, index) => (
                      <ListItem key={`${genre}_${index}`}>{genre}</ListItem>
                    ))
                  ) : (
                    <ListItem>No Genres Found</ListItem>
                  )}
                </List>
                {renderGenreInputs(person.personId)}
                {inputs.filter(
                  (input) =>
                    input.personId === person.personId && input.type === "genre"
                ).length === 0 && (
                  <button onClick={() => addInput("genre", person.personId)}>
                    Add Genre Input
                  </button>
                )}
              </FormWrapper>
              <FormWrapper>
                <SectionHeading>Movies</SectionHeading>
                <List>
                  {personMovieData[person.name]?.length > 0 ? (
                    personMovieData[person.name].map((movie, index) => (
                      <ListItem key={`${movie}_${index}`}>
                        {movie.movieName} ({movie.rating}/10)
                      </ListItem>
                    ))
                  ) : (
                    <ListItem>No Movies Found</ListItem>
                  )}
                </List>
                {renderMovieInputs(person.personId)}
                {inputs.filter(
                  (input) =>
                    input.personId === person.personId && input.type === "movie"
                ).length === 0 && (
                  <button onClick={() => addInput("movie", person.personId)}>
                    Add Movie Input
                  </button>
                )}
              </FormWrapper>
            </UserWrapper>
          ))
        ) : (
          <p>Loading user data...</p>
        )}
        {errors.length > 0 && (
          <ErrorPopup
            messages={errors.map((error) => error.message)}
            onClose={handleCloseError}
            length={errors.length}
          />
        )}
      </UserContainer>
    </>
  );
}
