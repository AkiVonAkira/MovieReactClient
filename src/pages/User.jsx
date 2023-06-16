import React, { useState, useEffect } from "react";
import api from "../apiConfig";
import styled from "styled-components";

const UserWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: var(--primary);
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
  margin-bottom: 20px;

  h3 {
    font-size: 18px;
    margin-bottom: 10px;
  }

  p {
    font-size: 14px;
    color: #555;
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
  background-color: var(--secondary);
  font-size: 1em;
  color: #fff;
  border: none;
  padding: 1em 2em;
  margin-left: 0.5em;
  border-radius: 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
    box-shadow: 0 10px 20px -15px black;
  }
`;

export default function User() {
  const [userData, setUserData] = useState(null);
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [newGenre, setNewGenre] = useState("");
  const [newMovie, setNewMovie] = useState("");
  const [newRating, setNewRating] = useState("");

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await api.get("/api/user");
      setUserData(response.data);
      setGenres(response.data.genres);
      setMovies(response.data.movies);
    } catch (error) {
      console.log(error);
    }
  };

  const addGenre = async () => {
    try {
      const response = await api.post("/api/user/genres", { genre: newGenre });
      setGenres([...genres, response.data]);
      setNewGenre("");
    } catch (error) {
      console.log(error);
    }
  };

  const addMovie = async () => {
    try {
      const response = await api.post("/api/user/movies", {
        movie: newMovie,
        rating: newRating,
      });
      setMovies([...movies, response.data]);
      setNewMovie("");
      setNewRating("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserWrapper>
      {userData && (
        <UserDetails>
          <h3>Name: {userData.name}</h3>
          <p>Email: {userData.email}</p>
        </UserDetails>
      )}
      <FormWrapper>
        <SectionHeading>Genres</SectionHeading>
        <List>
          {genres.map((genre) => (
            <ListItem key={genre.id}>{genre.name}</ListItem>
          ))}
        </List>
        <Form>
          <StyledInputWrapper
            type="text"
            value={newGenre}
            placeholder="Genre"
            onChange={(e) => setNewGenre(e.target.value)}
          />
          <StyledButton onClick={addGenre}>Add Genre</StyledButton>
        </Form>
      </FormWrapper>
      <FormWrapper>
        <SectionHeading>Movies</SectionHeading>
        <List>
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
        </Form>
      </FormWrapper>
    </UserWrapper>
  );
}
