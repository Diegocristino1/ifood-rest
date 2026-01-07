import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  :root {
    --primary-color: #E66767;
    --secondary-color: #FFEBD9;
    --bg-color: #FFF8F2;
    --text-color: #4B4B4B;
    --white: #FFFFFF;
  }

  body {
    background-color: var(--bg-color);
    color: var(--text-color);
  }
`

export default GlobalStyle

