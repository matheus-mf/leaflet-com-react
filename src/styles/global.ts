import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background-color: #FFF;
    color: #000;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  body, input, button, textarea {
    font-family: Nunito, sans-serif;
    font-size: 16px;
    font-weight: 600;
  }

  h1, h2, h3, h4, h5, strong {
    font-weight: 700;
  }

  button {
    cursor: pointer;
  }
`;
