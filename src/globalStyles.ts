import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
  body, html {
    height: 100%;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }

  #root {
    height: 100%;
  }

  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyle
