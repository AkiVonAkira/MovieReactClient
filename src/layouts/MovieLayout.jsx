import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import styled from "styled-components";

const MovieLayoutContainer = styled.div`
  .title {
    font-size: 24px;
    margin-bottom: 16px;
  }

  .description {
    margin-bottom: 16px;
  }

  nav {
    margin-bottom: 16px;
  }
`;

const GenreNavLink = styled(NavLink)`
  text-decoration: none;
  padding: 6px;
  border-radius: 4px;
  color: white;
  transition: background 0.3s;

  &.active {
    background: var(--primary);
  }

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const MovieLayout = () => {
  const [isGenresOpen, setIsGenresOpen] = useState(false);

  const toggleGenres = () => {
    setIsGenresOpen((prevIsGenresOpen) => !prevIsGenresOpen);
  };

  return (
    <MovieLayoutContainer>
      <h2 className="title">Movies</h2>
      <p className="description">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla, fugit!
      </p>

      <nav>
        <GenreNavLink
          to="genres"
          activeClassName="active"
          onClick={toggleGenres}
        >
          {isGenresOpen ? "Close Genres" : "View the Genres"}
        </GenreNavLink>
      </nav>

      {isGenresOpen && <Outlet />}
    </MovieLayoutContainer>
  );
};

export default MovieLayout;
