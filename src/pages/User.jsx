import React, { useState, useEffect } from "react";
import api from "../apiConfig";
import ErrorPopup from "../ErrorPopup";
import styled from "styled-components";

const PageContainer = styled.div`
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
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius: 0.5rem;
  /* gap: 1em; */
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
  margin: auto;
  gap: 1em;

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

let inputCounter = 0;
export default function User() {
  const [userData, setUserData] = useState([]);
  const [genreData, setGenreData] = useState([]);
  const [personGenreData, setPersonGenreData] = useState({});
  const [movieData, setMovieData] = useState([]);
  const [personMovieData, setPersonMovieData] = useState({});
  // const [movies, setMovies] = useState([]);
  // const [newMovie, setNewMovie] = useState("");
  // const [newRating, setNewRating] = useState("");
  const [inputs, setInputs] = useState([]);
  const [error, setError] = useState(null);

  const handleCloseError = () => {
    setError(null);
  };

  const addInput = (type, personId) => {
    const existingInputs = inputs.filter(
      (input) => input.personId === personId
    );
    if (existingInputs.length === 0) {
      const newInput = { id: `input_${inputCounter}`, personId, [type]: "" };
      inputCounter++;
      setInputs([...inputs, newInput]);
    }
  };

  const updateInput = (type, inputId, value) => {
    const updatedInputs = inputs.map((input) => {
      if (input.id === inputId) {
        return { ...input, [type]: value };
      }
      return input;
    });
    setInputs(updatedInputs);
  };

  useEffect(() => {
    fetchUserData();
    fetchGenreData();
    fetchMovieData();
  }, []);

  useEffect(() => {
    userData.forEach((person) => {
      fetchPersonGenreData(person.name);
      fetchPersonMovieData(person.name);
    });
  }, [userData]);

  const fetchUserData = async () => {
    try {
      const response = await api.get("/api/person/");
      setUserData(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError("An error occurred while fetching user data.");
        console.error("An error occurred while fetching user data:", error);
      } else {
        setError("An error occurred. The server may be down.");
        console.error("An error occurred:", error);
      }
    }
  };

  const fetchGenreData = async () => {
    try {
      const response = await api.get("/api/genre/");
      setGenreData(response.data);
    } catch (error) {
      setError("An error occurred while fetching genre data.");
      console.error("An error occurred while fetching genre data:", error);
    }
  };

  const fetchMovieData = async () => {
    try {
      const response = await api.get("/api/movie/");
      setMovieData(response.data);
    } catch (error) {
      setError("An error occurred while fetching movie data.");
      console.error("An error occurred while fetching movie data:", error);
    }
  };

  const fetchPersonGenreData = async (personName) => {
    try {
      const response = await api.get(`/api/person/genre?name=${personName}`);
      const genres = response.data;
      setPersonGenreData((prevData) => ({
        ...prevData,
        [personName]: genres,
      }));
    } catch (error) {
      setError(
        `An error occurred while fetching genre data for ${personName}.`
      );
      console.error(
        `An error occurred while fetching genre data for ${personName}:`,
        error
      );
    }
  };

  const fetchPersonMovieData = async (personName) => {
    try {
      const response = await api.get(`/api/person/movie?name=${personName}`);
      const movies = response.data;
      setPersonMovieData((prevData) => ({
        ...prevData,
        [personName]: movies,
      }));
    } catch (error) {
      setError(
        `An error occurred while fetching movie data for ${personName}.`
      );
      console.error(
        `An error occurred while fetching movie data for ${personName}:`,
        error
      );
    }
  };

  const addGenreToPerson = async (personId, genreName) => {
    try {
      const genre = genreData.find(
        (genre) => genreName.toLowerCase() === genre.name.toLowerCase()
      );
      if (!genre) {
        setError(`Invalid genre: ${genreName}`);
        return;
      }
      console.log(genre.genreId);

      const response = await api.post("/api/person/genre", {
        personId: personId,
        genreId: genre.genreId,
      });
      console.log(response.data);
    } catch (error) {
      setError("An error occurred while adding genre to person.");
      console.error("An error occurred while adding genre to person:", error);
    }
  };

  const addMovie = () => {
    //
  };

  return (
    <>
      <Title>Users</Title>
      <PageContainer>
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
                    personGenreData[person.name]?.map((genre, index) => (
                      <ListItem key={`${genre}_${index}`}>{genre}</ListItem>
                    ))
                  ) : (
                    <ListItem>No Genres Found</ListItem>
                  )}
                </List>

                {inputs.map((input) => {
                  if (input.personId === person.personId) {
                    return (
                      <Form key={input.id}>
                        <StyledInputWrapper
                          type="text"
                          value={input.genre}
                          placeholder="Genre Name"
                          onChange={(e) =>
                            updateInput(input.id, e.target.value, "genre")
                          }
                        />
                        {inputs.filter(
                          (input) => input.personId === person.personId
                        ).length === 1 ? (
                          <button
                            onClick={() =>
                              addGenreToPerson(person.personId, input.genre)
                            }
                          >
                            Add Genre
                          </button>
                        ) : null}
                      </Form>
                    );
                  }
                  return null;
                })}
                {inputs.filter((input) => input.personId === person.personId)
                  .length === 0 && (
                  <button onClick={() => addInput("genre", person.personId)}>
                    Add Genre Input
                  </button>
                )}
              </FormWrapper>
              <FormWrapper>
                <SectionHeading>Movies</SectionHeading>
                <List>
                  {personMovieData[person.name]?.length > 0 ? (
                    personMovieData[person.name]?.map((movie, index) => (
                      <ListItem key={`${movie}_${index}`}>
                        {movie.movieName}
                      </ListItem>
                    ))
                  ) : (
                    <ListItem>No Movies Found</ListItem>
                  )}
                </List>

                {/*<Form>
                  <StyledInputWrapper
                    type="text"
                    value={newMovie}
                    placeholder="Movie Name"
                    onChange={(e) => setNewMovie(e.target.value)}
                  />
                  <StyledInputWrapper
                    type="text"
                    value={newRating}
                    placeholder="Movie Rating"
                    onChange={(e) => setNewRating(e.target.value)}
                  />
                  <button onClick={addMovie}>Add Movie</button>
                </Form> */}
              </FormWrapper>
            </UserWrapper>
          ))
        ) : (
          <p>Loading user data...</p>
        )}
        {error && <ErrorPopup message={error} onClose={handleCloseError} />}
      </PageContainer>
    </>
  );
}
