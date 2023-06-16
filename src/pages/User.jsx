import React, { useState, useEffect } from "react";
import api from "../apiConfig";
import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-flow: row;
  flex-wrap: wrap;
  padding: 1.5rem;
  background-color: var(--primary);
  border-radius: 0.5rem;
  box-shadow: 0 10px 20px -15px black;
  gap: 1em;
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
  gap: 1em;
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
  &::h1 {
    box-shadow: 0 10px 20px -15px black;
  }
`;

const SectionHeading = styled.h3`
  font-size: 2rem;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ListItem = styled.li`
  font-size: 14px;
  margin-bottom: 5px;
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
  const [personGenreData, setPersonGenreData] = useState([]);
  const [newGenre, setNewGenre] = useState("");
  const [genreInputs, setGenreInputs] = useState([]);
  // const [movies, setMovies] = useState([]);
  // const [newMovie, setNewMovie] = useState("");
  // const [newRating, setNewRating] = useState("");

  useEffect(() => {
    fetchUserData();
    fetchGenreData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await api.get("/api/person/");
      setUserData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchGenreData = async () => {
    try {
      const response = await api.get("/api/genre/");
      setGenreData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPersonGenreData = async (personName) => {
    try {
      const response = await api.get(`/api/person/genre?name=${personName}`);
      setPersonGenreData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addGenreToPerson = async (personId, genreId) => {
    try {
      const response = await api.post("/api/person/genre", {
        PersonId: personId,
        GenreId: genreId,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addGenreInput = (personId) => {
    const newInput = { id: `input_${inputCounter}`, personId, genre: "" };
    inputCounter++;
    setGenreInputs([...genreInputs, newInput]);
  };

  const updateGenreInput = (inputId, value) => {
    const updatedInputs = genreInputs.map((input) => {
      if (input.id === inputId) {
        return { ...input, genre: value };
      }
      return input;
    });
    setGenreInputs(updatedInputs);
  };

  const addMovie = () => {
    //
  };

  return (
    <PageContainer>
      {userData.length > 0 ? (
        userData.map((person, index) => (
          <UserWrapper key={person.personId}>
            <UserDetails>
              <h1>User</h1>
              <h3>Name: {person.name}</h3>
              <p>Email: {person.email}</p>
            </UserDetails>
            <FormWrapper>
              <SectionHeading>Genres</SectionHeading>
              <List>
                {personGenreData[index]?.map((genre) => (
                  <ListItem key={genre}>{genre}</ListItem>
                ))}
              </List>
              {genreInputs.map((input, genreIndex) => {
                if (input.personId === person.personId) {
                  return (
                    <Form key={input.id}>
                      <StyledInputWrapper
                        type="text"
                        value={input.genre}
                        placeholder="Genre"
                        onChange={(e) =>
                          updateGenreInput(input.id, e.target.value)
                        }
                      />
                      <button
                        onClick={() =>
                          addGenreToPerson(person.personId, input.genre)
                        }
                      >
                        Add Genre
                      </button>
                    </Form>
                  );
                }
                return null;
              })}
              <button onClick={() => addGenreInput(person.personId)}>
                Add Genre Input
              </button>
            </FormWrapper>
            <FormWrapper>
              <SectionHeading>Movies</SectionHeading>
              {/* <List>
                {movies.map((movie) => (
                  <ListItem key={movie.id}>
                    {movie.name} - Rating: {movie.rating}
                  </ListItem>
                ))}
              </List>
              <Form>
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
    </PageContainer>
  );
}
