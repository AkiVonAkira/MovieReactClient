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
  margin-top: 10px;
  gap: 1em;
`;

const StyledInputWrapper = styled.input`
  flex: 1;
  height: 2rem;
  width: 100%;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  background-color: transparent;
  padding: .5em ;
  font-size: 1rem;
  outline: none;
  transition: box-shadow 0.2s ease-in-out;
  margin: auto

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

const StyledButton = styled.button`
  display: flex;
  background-color: var(--primary);
  font-size: 1em;
  color: #fff;
  border: none;
  padding: 1em 2em;
  margin-left: 0.5em;
  border-radius: 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: #c20d0d;
    box-shadow: 0 10px 20px -15px black;
  }
`;

export default function User() {
  const [userData, setUserData] = useState([]);
  const [genreData, setGenreData] = useState([]);
  const [personGenreData, setPersonGenreData] = useState([]);
  const [newGenre, setNewGenre] = useState("");
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
              <Form>
                <StyledInputWrapper
                  type="text"
                  value={newGenre}
                  placeholder="Genre"
                  onChange={(e) => setNewGenre(e.target.value)}
                />
                <StyledButton
                  onClick={() =>
                    addGenreToPerson(person.personId, genreData.genreId)
                  }
                >
                  Add Genre
                </StyledButton>
              </Form>
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
                <StyledButton onClick={addMovie}>Add Movie</StyledButton>
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
