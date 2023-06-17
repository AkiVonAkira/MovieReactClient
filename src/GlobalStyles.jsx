import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;

    color-scheme: dark;

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;

    --primary: #bc4123;
    --secondary: #2b3452;
    --accent: #0086a5;
  }

  body {
    min-width: 320px;
    min-height: 100vh;
    padding: 0;
    margin: 0;
    font-family: "Poppins";
    background: var(--secondary);
  }

  * {
    color: #fff;
    margin: 0;
    padding: 0;
  }

  p {
    margin: 0;
  }

  button {
    display: flex;
    justify-content: center; 
    align-items: center;
    background-color: var(--primary);
    font-size: 1em;
    color: #fff;
    border: none;
    padding: 1em 2em;
    border-radius: 0.5rem;
    cursor: pointer;
    &:hover {
      background-color: #c20d0d;
      box-shadow: 0 10px 20px -15px black;
    }
  }
`;

export default GlobalStyles;
