import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;

    --primary: #bc4123;
    --secondary: #2b3452;
  }

  body {
    margin: 0;
    padding: 20px;
    font-family: "Poppins";
    background: var(--secondary);
  }

  * {
    color: #fff;
    margin: 0;
  }

  p {
    margin: 20px 0;
  }

  button {
    border: 0;
    padding: 8px;
    border-radius: 4px;
    color: #fff;
    background: var(--primary);
    cursor: pointer;
  }
`;

export default GlobalStyles;
