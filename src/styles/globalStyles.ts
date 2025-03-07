import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  /* Importing Google Fonts */
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');

  /* Global Body Styles */
  body {
    font-family: 'Roboto', Arial, sans-serif; /* Applying custom font */
    margin: 0;
    padding: 0;
    background: white;
    box-sizing: border-box;
    min-height: 100vh; /* Ensures full viewport height */
    display: flex;
    flex-direction: column;
  }

  h1, h2, h3 {
    color: #333;
  }

  /* Ensuring footer stays at the bottom */
  footer {
    margin-top: auto; /* Push footer to the bottom of the page */
  }
`;
