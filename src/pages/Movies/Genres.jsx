import React from "react";
import styled from "styled-components";

const GenresContainer = styled.div`
  margin: 2rem 1rem;
`;

const Genre = styled.div`
  strong {
    font-weight: bold;
  }

  p {
    margin-top: 1rem;
  }
`;

const Genres = () => {
  return (
    <GenresContainer>
      <Genre>
        <p>
          <strong>Genre Title</strong> - Genre Description.
        </p>
      </Genre>

      <Genre>
        <p>
          <strong>Genre Title</strong> - Genre Description. Lorem ipsum dolor
          sit amet consectetur adipisicing elit.
        </p>
      </Genre>
    </GenresContainer>
  );
};

export default Genres;
