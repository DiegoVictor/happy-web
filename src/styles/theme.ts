import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0px;
    padding: 0px;
  }

  body {
    background-color: #ebf2f5;
    color: #fff
  }

  body, input, button, textarea {
    font: 600 18px Nunito, sans-serif;
  }
`;
